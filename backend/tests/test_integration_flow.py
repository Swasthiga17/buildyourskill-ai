import pytest
import asyncio
import time
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.db.session import init_db

@pytest.fixture
def anyio_backend():
    return "asyncio"

@pytest.fixture(autouse=True)
async def setup_db():
    await init_db()

@pytest.mark.anyio
async def test_full_phase27_continuous_personalization_loop():
    """Phase 27 End-to-End Validation:
    User -> Profile -> Knowledge Evidence -> Knowledge Twin -> Skill Gap Engine -> 
    Adaptive Roadmap -> Assessment/Interview -> Evidence -> Twin Update -> Roadmap Recalculation -> Mentor Context.
    """
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        ts = int(time.time() * 1000)
        
        # 1. Register User A (Sophia AI Engineer)
        res_reg = await client.post("/api/auth/register", json={
            "email": f"sophia_{ts}@growskill.ai",
            "full_name": "Sophia AI Engineer",
            "password": "SecurePassword2026!",
            "target_role": "AI/ML Engineer"
        })
        assert res_reg.status_code == 200
        token_a = res_reg.json()["access_token"]
        headers_a = {"Authorization": f"Bearer {token_a}"}

        # 2. Verify Initial Knowledge Twin Baseline
        twin_initial = await client.get("/api/knowledge-twin/", headers=headers_a)
        assert twin_initial.status_code == 200
        pytorch_init = next(s for s in twin_initial.json()["skills"] if s["id"] == "pytorch")
        assert pytorch_init["currentScore"] <= 55.0
        initial_evidence_count = len(pytorch_init["evidence"])

        # 3. Initial Skill Gaps
        gaps_init = await client.get("/api/skill-gaps/", headers=headers_a)
        assert gaps_init.status_code == 200
        pytorch_gap_init = next(g for g in gaps_init.json()["priority_gaps"] if g["skill_code"] == "pytorch")
        assert pytorch_gap_init["gap"] >= 30.0

        # 4. User completes rigorous Staff-level Interview on PyTorch Autograd
        interview_res = await client.post("/api/interview/evaluate", headers=headers_a, json={
            "question_title": "PyTorch Autograd & Computational Graph Optimization",
            "category": "Deep Learning Engineering",
            "user_answer": "In PyTorch, dynamic computational graphs (DAGs) are constructed on the fly during forward pass. Each tensor with requires_grad=True maintains a grad_fn pointer. loss.backward() triggers reverse topological traversal using the chain rule to populate .grad on leaf weight tensors.",
            "expected_keywords": ["DAG", "requires_grad", "Chain Rule"]
        })
        assert interview_res.status_code == 200
        assert interview_res.json()["overall_score"] >= 80.0

        # 5. Verify Knowledge Twin dynamic update
        twin_after_interview = await client.get("/api/knowledge-twin/", headers=headers_a)
        assert twin_after_interview.status_code == 200
        pytorch_after_int = next(s for s in twin_after_interview.json()["skills"] if s["id"] == "pytorch")
        assert pytorch_after_int["currentScore"] > pytorch_init["currentScore"]
        assert len(pytorch_after_int["evidence"]) > initial_evidence_count

        # 6. Verify Skill Gap decreased
        gaps_after_int = await client.get("/api/skill-gaps/", headers=headers_a)
        assert gaps_after_int.status_code == 200
        pytorch_gap_after_int = next(g for g in gaps_after_int.json()["priority_gaps"] if g["skill_code"] == "pytorch")
        assert pytorch_gap_after_int["gap"] < pytorch_gap_init["gap"]

        # 7. User completes Project Blueprint
        gen_proj = await client.post("/api/projects/generate", headers=headers_a, json={
            "goal": "Build High-throughput PyTorch Serving Pipeline",
            "difficulty": "Advanced",
            "target_role": "AI/ML Engineer"
        })
        assert gen_proj.status_code == 200
        proj_id = gen_proj.json()["id"]

        # Mark project completed -> triggers project evidence
        comp_proj = await client.post(f"/api/projects/{proj_id}/complete", headers=headers_a)
        assert comp_proj.status_code == 200
        assert comp_proj.json()["status"] == "success"

        # 8. User uploads Knowledge Document and Submits Quiz
        ingest_doc = await client.post("/api/knowledge/ingest", headers=headers_a, json={
            "title": "PyTorch Distributed Data Parallel (DDP) Architecture",
            "content": "DDP replicates the model on each GPU. During backward pass, Ring-AllReduce synchronizes gradients across ranks concurrently with backward computation."
        })
        assert ingest_doc.status_code == 200
        doc_id = ingest_doc.json()["document_id"]

        quiz_res = await client.post(f"/api/knowledge/{doc_id}/submit-quiz", headers=headers_a, json={
            "answers": [0, 1]
        })
        assert quiz_res.status_code == 200
        assert quiz_res.json()["status"] == "success"

        # 9. Verify Adaptive Roadmap recalculation with Actionable Steps
        roadmap_res = await client.get("/api/roadmap/", headers=headers_a)
        assert roadmap_res.status_code == 200
        steps = roadmap_res.json()["steps"]
        assert len(steps) == 12
        assert "recommended_action" in steps[0]

        # 10. Verify Dynamic Today Plan generated from Learner Context
        today_res = await client.get("/api/today-plan/", headers=headers_a)
        assert today_res.status_code == 200
        assert len(today_res.json()["tasks"]) == 4

        # 11. Verify AI Mentor Chat retrieves personalized context and RAG
        mentor_res = await client.post("/api/mentor/chat", headers=headers_a, json={
            "message": "What should I focus on next to prepare for AI engineering roles?"
        })
        assert mentor_res.status_code == 200
        assert mentor_res.json()["conversation_id"] > 0
        assert len(mentor_res.json()["reply"]) > 20

        # 12. Verify Anti-Manipulation (Duplicate quiz spam does not inflate score)
        dup_quiz = await client.post(f"/api/knowledge/{doc_id}/submit-quiz", headers=headers_a, json={
            "answers": [0, 1]
        })
        assert dup_quiz.status_code == 200
        assert dup_quiz.json()["evidence"]["status"] == "skipped"

        # 13. Prove Multi-Tenant Isolation for User B
        res_reg_b = await client.post("/api/auth/register", json={
            "email": f"david_{ts}@growskill.ai",
            "full_name": "David Isolated",
            "password": "SecurePassword2026!",
            "target_role": "MLOps Specialist"
        })
        assert res_reg_b.status_code == 200
        token_b = res_reg_b.json()["access_token"]
        headers_b = {"Authorization": f"Bearer {token_b}"}

        # David searches for Sophia's document -> 0 results
        search_b = await client.post("/api/knowledge/search", headers=headers_b, json={
            "query": "Distributed Data Parallel DDP"
        })
        assert search_b.status_code == 200
        assert len(search_b.json()["results"]) == 0
