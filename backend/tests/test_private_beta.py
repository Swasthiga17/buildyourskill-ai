import pytest
import time
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.db.session import init_db
from app.core.config import settings

@pytest.fixture
def anyio_backend():
    return "asyncio"

@pytest.fixture(autouse=True)
async def setup_db():
    await init_db()

@pytest.mark.anyio
async def test_private_beta_access_gate():
    """Verify private beta invite code enforcement during user registration."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        ts = int(time.time() * 1000)

        # Temporarily enable private beta mode
        orig_beta_mode = settings.PRIVATE_BETA_MODE
        orig_code = settings.BETA_ACCESS_CODE
        settings.PRIVATE_BETA_MODE = True
        settings.BETA_ACCESS_CODE = "BETA-PILOT-2026"

        try:
            # 1. Attempt register with invalid beta invite code -> 403 Forbidden
            res_invalid = await client.post("/api/auth/register", json={
                "email": f"uninvited_{ts}@example.com",
                "full_name": "Uninvited Tester",
                "password": "Password123!",
                "invite_code": "WRONG-CODE"
            })
            assert res_invalid.status_code == 403
            assert "invite-only" in res_invalid.json()["detail"]

            # 2. Attempt register with valid beta code -> 200 OK
            res_valid = await client.post("/api/auth/register", json={
                "email": f"invited_{ts}@example.com",
                "full_name": "Invited Beta Tester",
                "password": "Password123!",
                "invite_code": "BETA-PILOT-2026"
            })
            assert res_valid.status_code == 200
            assert "access_token" in res_valid.json()

        finally:
            settings.PRIVATE_BETA_MODE = orig_beta_mode
            settings.BETA_ACCESS_CODE = orig_code

@pytest.mark.anyio
async def test_in_app_beta_feedback_and_ratings():
    """Verify feedback capture endpoint for AI evaluations, ratings, and bug reports."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        ts = int(time.time() * 1000)
        reg = await client.post("/api/auth/register", json={
            "email": f"feedback_tester_{ts}@example.com",
            "full_name": "Feedback Tester",
            "password": "Password123!"
        })
        token = reg.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        # 1. Submit valid 5-star mentor feedback
        fb_res = await client.post("/api/feedback/", headers=headers, json={
            "category": "mentor",
            "rating": 5,
            "comment": "The autograd DAG visual explanation was accurate and helped me understand backward hooks.",
            "metadata": {"topic": "pytorch"}
        })
        assert fb_res.status_code == 200
        fb_data = fb_res.json()
        assert fb_data["id"] > 0
        assert fb_data["rating"] == 5

        # 2. Empty comment rejection -> 400
        fb_empty = await client.post("/api/feedback/", headers=headers, json={
            "category": "bug",
            "rating": 1,
            "comment": "   "
        })
        assert fb_empty.status_code == 400

        # 3. Retrieve user's feedback list
        fb_list = await client.get("/api/feedback/", headers=headers)
        assert fb_list.status_code == 200
        assert len(fb_list.json()) >= 1

@pytest.mark.anyio
async def test_admin_beta_metrics_telemetry():
    """Verify aggregated cohort telemetry and learner sentiment metrics."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        res = await client.get("/api/admin/beta-metrics")
        assert res.status_code == 200
        metrics = res.json()
        assert "total_beta_users" in metrics
        assert "cohort_rating_avg" in metrics
        assert "average_knowledge_score" in metrics
        assert metrics["total_beta_users"] > 0

@pytest.mark.anyio
async def test_security_headers_and_health_probes():
    """Verify production security headers and container health probes."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # Liveness & Readiness Probes
        live = await client.get("/health/live")
        assert live.status_code == 200
        assert live.json()["status"] == "alive"

        ready = await client.get("/health/ready")
        assert ready.status_code == 200
        assert ready.json()["status"] == "ready"

        # Security Headers
        assert "x-request-id" in live.headers
        assert live.headers.get("x-content-type-options") == "nosniff"
        assert live.headers.get("x-frame-options") == "DENY"
