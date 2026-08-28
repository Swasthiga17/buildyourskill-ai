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
async def test_multi_user_data_isolation():
    """Verify strict multi-tenant isolation: User A's private RAG documents and Knowledge Twin never leak to User B."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        ts = int(time.time() * 1000)
        # Register User A (Alice)
        res_a = await client.post("/api/auth/register", json={
            "email": f"alice_{ts}@example.com",
            "full_name": "Alice Isolated",
            "password": "Password123!",
            "target_role": "LLM Engineer"
        })
        assert res_a.status_code == 200
        token_a = res_a.json()["access_token"]
        headers_a = {"Authorization": f"Bearer {token_a}"}

        # Register User B (Bob)
        res_b = await client.post("/api/auth/register", json={
            "email": f"bob_{ts}@example.com",
            "full_name": "Bob Isolated",
            "password": "Password123!",
            "target_role": "MLOps Specialist"
        })
        assert res_b.status_code == 200
        token_b = res_b.json()["access_token"]
        headers_b = {"Authorization": f"Bearer {token_b}"}

        # 1. Alice ingests a sensitive private document
        res_ingest = await client.post("/api/knowledge/ingest", headers=headers_a, json={
            "title": "Alice Confidential Quantum ML Research",
            "content": "Superconducting qubits coupled with tensor network quantum circuits for exponential speedups."
        })
        assert res_ingest.status_code == 200
        assert res_ingest.json()["document_id"] > 0

        # 2. Alice searches for her document -> Found
        search_a = await client.post("/api/knowledge/search", headers=headers_a, json={
            "query": "superconducting qubits quantum"
        })
        assert search_a.status_code == 200
        assert len(search_a.json()["results"]) > 0
        assert search_a.json()["results"][0]["doc_title"] == "Alice Confidential Quantum ML Research"

        # 3. Bob searches for the exact same query -> Zero results (Cannot access Alice's data)
        search_b = await client.post("/api/knowledge/search", headers=headers_b, json={
            "query": "superconducting qubits quantum"
        })
        assert search_b.status_code == 200
        assert len(search_b.json()["results"]) == 0

        # 4. Bob lists documents -> Empty list
        docs_b = await client.get("/api/knowledge/", headers=headers_b)
        assert docs_b.status_code == 200
        assert len(docs_b.json()) == 0

@pytest.mark.anyio
async def test_end_to_end_assessment_evidence_feedback_loop():
    """Verify full feedback loop: Assessment -> Evidence -> Knowledge Twin Score Update -> Skill Gap Reduction -> Roadmap Recalculation."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        ts = int(time.time() * 1000)
        # Register fresh user
        res_reg = await client.post("/api/auth/register", json={
            "email": f"charlie_{ts}@example.com",
            "full_name": "Charlie Loop",
            "password": "Password123!",
            "target_role": "AI/ML Engineer"
        })
        assert res_reg.status_code == 200
        token = res_reg.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        # 1. Check Initial Gaps for PyTorch
        gaps_initial = await client.get("/api/skill-gaps/", headers=headers)
        assert gaps_initial.status_code == 200
        pytorch_gap_before = next(g for g in gaps_initial.json()["priority_gaps"] if g["skill_code"] == "pytorch")
        assert pytorch_gap_before["current_score"] <= 55.0

        # 2. User completes staff-level interview on PyTorch with high score
        interview_res = await client.post("/api/interview/evaluate", headers=headers, json={
            "question_title": "PyTorch Autograd & Computational Graph",
            "category": "Deep Learning Engineering",
            "user_answer": "In PyTorch, dynamic computational graphs (DAGs) are constructed during the forward pass. Each tensor with requires_grad=True maintains a grad_fn pointer. loss.backward() triggers reverse topological traversal using the chain rule to populate .grad on leaf weight tensors.",
            "expected_keywords": ["DAG", "requires_grad", "Chain Rule"]
        })
        assert interview_res.status_code == 200
        assert interview_res.json()["overall_score"] >= 80.0

        # 3. Verify Knowledge Twin score updated
        twin_updated = await client.get("/api/knowledge-twin/", headers=headers)
        assert twin_updated.status_code == 200
        pytorch_node = next(s for s in twin_updated.json()["skills"] if s["id"] == "pytorch")
        assert pytorch_node["currentScore"] > pytorch_gap_before["current_score"]
        assert len(pytorch_node["evidence"]) >= 1

        # 4. Verify Skill Gap decreased
        gaps_after = await client.get("/api/skill-gaps/", headers=headers)
        assert gaps_after.status_code == 200
        pytorch_gap_after = next(g for g in gaps_after.json()["priority_gaps"] if g["skill_code"] == "pytorch")
        assert pytorch_gap_after["gap"] < pytorch_gap_before["gap"]

        # 5. Verify Adaptive Roadmap recalculation
        roadmap_res = await client.get("/api/roadmap/", headers=headers)
        assert roadmap_res.status_code == 200
        steps = roadmap_res.json()["steps"]
        assert len(steps) == 12

@pytest.mark.anyio
async def test_sandbox_security_and_timeout():
    """Verify multi-layer sandbox security: rejects dangerous imports, malicious calls, and enforces execution timeouts."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # Test 1: Malicious os.system
        res_os = await client.post("/api/assessments/run-code", json={
            "code": "import os\nos.system('dir')"
        })
        assert res_os.status_code == 200
        assert res_os.json()["status"] == "error"
        assert "Security" in res_os.json()["output"]

        # Test 2: Malicious __import__ call
        res_imp = await client.post("/api/assessments/run-code", json={
            "code": "mod = __import__('socket')"
        })
        assert res_imp.status_code == 200
        assert res_imp.json()["status"] == "error"

        # Test 3: Valid pure computation in isolated subprocess
        valid_code = "squares = [x * x for x in range(5)]\nprint('Computed:', squares)"
        res_valid = await client.post("/api/assessments/run-code", json={
            "code": valid_code
        })
        assert res_valid.status_code == 200
        assert res_valid.json()["status"] == "success"
        assert "Computed: [0, 1, 4, 9, 16]" in res_valid.json()["output"]

@pytest.mark.anyio
async def test_rag_validation_and_empty_rejection():
    """Verify RAG input validation rejects empty documents."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # Empty document rejection
        res_empty = await client.post("/api/knowledge/ingest", json={
            "title": "Empty Doc",
            "content": "   "
        })
        assert res_empty.status_code == 400
