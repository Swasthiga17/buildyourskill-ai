import pytest
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
async def test_health_endpoint():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        res = await client.get("/api/health")
        assert res.status_code == 200
        assert res.json()["status"] == "healthy"

@pytest.mark.anyio
async def test_auth_and_profile_flow():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # 1. Login with demo user
        res = await client.post("/api/auth/login", json={
            "email": "alex.rivera@example.com",
            "password": "password123"
        })
        assert res.status_code == 200
        data = res.json()
        assert "access_token" in data
        token = data["access_token"]

        # 2. Get Me
        headers = {"Authorization": f"Bearer {token}"}
        res_me = await client.get("/api/auth/me", headers=headers)
        assert res_me.status_code == 200
        me_data = res_me.json()
        assert me_data["email"] == "alex.rivera@example.com"
        assert me_data["profile"]["target_role"] == "AI/ML Engineer"

@pytest.mark.anyio
async def test_knowledge_twin_and_evidence():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # Get twin summary
        res = await client.get("/api/knowledge-twin/")
        assert res.status_code == 200
        twin = res.json()
        assert "knowledge_score" in twin
        assert len(twin["skills"]) > 0

        # Add evidence
        ev_res = await client.post("/api/knowledge-twin/evidence", json={
            "skill_code": "pytorch",
            "evidence_type": "quiz",
            "title": "PyTorch Autograd Quiz",
            "detail": "Scored 95% on tensor operations",
            "score": 95.0,
            "confidence": "high"
        })
        assert ev_res.status_code == 200
        assert ev_res.json()["status"] == "success"

@pytest.mark.anyio
async def test_skill_gaps_calculation():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        res = await client.get("/api/skill-gaps/")
        assert res.status_code == 200
        gaps = res.json()
        assert "priority_gaps" in gaps
        assert len(gaps["priority_gaps"]) > 0
        assert "industry_benchmark_match" in gaps

@pytest.mark.anyio
async def test_adaptive_roadmap_engine():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        res = await client.get("/api/roadmap/")
        assert res.status_code == 200
        roadmap = res.json()
        assert "steps" in roadmap
        assert len(roadmap["steps"]) == 12
        assert roadmap["overall_progress"] >= 0.0

@pytest.mark.anyio
async def test_ai_mentor_chat():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        res = await client.post("/api/mentor/chat", json={
            "message": "What is the best way to close my PyTorch skill gap?"
        })
        assert res.status_code == 200
        reply = res.json()
        assert "reply" in reply
        assert len(reply["reply"]) > 10

@pytest.mark.anyio
async def test_project_generator():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        res = await client.post("/api/projects/generate", json={
            "goal": "Build an Enterprise RAG Pipeline",
            "target_role": "AI/ML Engineer",
            "difficulty": "Advanced"
        })
        assert res.status_code == 200
        proj = res.json()
        assert "title" in proj
        assert "milestones" in proj
        assert len(proj["tech_stack"]) > 0

@pytest.mark.anyio
async def test_interview_evaluation_and_feedback():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        res = await client.post("/api/interview/evaluate", json={
            "question_title": "PyTorch Autograd & Computational Graph",
            "category": "Deep Learning Engineering",
            "user_answer": "PyTorch builds dynamic computational graphs during the forward pass and tracks operations with requires_grad=True. loss.backward() applies the chain rule.",
            "expected_keywords": ["DAG", "requires_grad", "Chain Rule"]
        })
        assert res.status_code == 200
        evaluation = res.json()
        assert evaluation["overall_score"] >= 70.0
        assert "feedback" in evaluation
        assert "updated_knowledge_score" in evaluation

@pytest.mark.anyio
async def test_code_sandbox_ast_security():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # Safe execution
        safe_code = "import math\nvectors = [math.cos(i * 0.1) for i in range(10)]\nprint('Generated dense vectors:', len(vectors))"
        res_safe = await client.post("/api/assessments/run-code", json={"code": safe_code})
        assert res_safe.status_code == 200
        assert res_safe.json()["status"] == "success"

        # Malicious code attempt (rejected by AST checker)
        unsafe_code = "import os\nos.system('echo hacked')"
        res_unsafe = await client.post("/api/assessments/run-code", json={"code": unsafe_code})
        assert res_unsafe.status_code == 200
        assert res_unsafe.json()["status"] == "error"
        assert "Security Violation" in res_unsafe.json()["output"]

@pytest.mark.anyio
async def test_rag_ingest():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        res = await client.post("/api/knowledge/ingest", json={
            "title": "Introduction to Vector Embeddings & RAG",
            "content": "Dense vector retrieval maps unstructured text into high-dimensional geometric representations where semantic closeness corresponds to small cosine distance."
        })
        assert res.status_code == 200
        data = res.json()
        assert data["document_id"] > 0
        assert len(data["key_concepts"]) > 0

@pytest.mark.anyio
async def test_today_plan():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        res = await client.get("/api/today-plan/")
        assert res.status_code == 200
        plan = res.json()
        assert "tasks" in plan
        assert len(plan["tasks"]) > 0
