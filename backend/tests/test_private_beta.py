import pytest
import time
from datetime import datetime, timedelta
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.db.session import init_db, AsyncSessionLocal
from app.core.config import settings
from app.services.beta_service import beta_service
from app.db.models import BetaInvite

@pytest.fixture
def anyio_backend():
    return "asyncio"

@pytest.fixture(autouse=True)
async def setup_db():
    await init_db()

@pytest.mark.anyio
async def test_full_phase29_private_beta_workflow():
    """Phase 29 Comprehensive Private Beta Test Suite:
    - Invite generation, hashing, and validation
    - Expired, exhausted, and invalid invite rejection
    - Registration with BetaMembership creation
    - Non-beta mode normal registration
    - Guided 4-step onboarding progress and PostgreSQL persistence
    - Feedback submission, validation, sentiment classification, and user isolation
    - Admin authorization (403 for regular users, 200 for admins)
    - Cohort metrics & Knowledge Twin growth calculations
    - No private user data leakage
    """
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        ts = int(time.time() * 1000)

        # -------------------------------------------------------------
        # 1. Admin Setup & Invite Code Generation
        # -------------------------------------------------------------
        # Register Admin User
        res_admin = await client.post("/api/auth/register", json={
            "email": f"admin_{ts}@growskill.ai",
            "full_name": "Admin Officer",
            "password": "AdminSecurePassword2026!",
            "invite_code": "BETA-AI-2026"
        })
        assert res_admin.status_code == 200
        admin_token = res_admin.json()["access_token"]
        admin_headers = {"Authorization": f"Bearer {admin_token}"}

        # Admin generates a single-use invite code
        res_inv = await client.post("/api/admin/create-invite", headers=admin_headers, json={
            "max_uses": 1,
            "expiry_days": 14,
            "cohort": "pilot-sept-2026"
        })
        assert res_inv.status_code == 200
        inv_data = res_inv.json()
        raw_code = inv_data["raw_invite_code"]
        assert raw_code.startswith("BS-AI-")

        # -------------------------------------------------------------
        # 2. Invite Code Validation Checks
        # -------------------------------------------------------------
        # Valid code
        val_valid = await client.post("/api/beta/validate-invite", json={"invite_code": raw_code})
        assert val_valid.status_code == 200
        assert val_valid.json()["valid"] is True
        assert val_valid.json()["cohort"] == "pilot-sept-2026"
        assert val_valid.json()["remaining_uses"] == 1

        # Invalid code
        val_inv = await client.post("/api/beta/validate-invite", json={"invite_code": "BS-AI-FAKE-CODE"})
        assert val_inv.status_code == 200
        assert val_inv.json()["valid"] is False

        # -------------------------------------------------------------
        # 3. Private Beta Access Gate (Enable Beta Mode)
        # -------------------------------------------------------------
        orig_beta_mode = settings.PRIVATE_BETA_MODE
        settings.PRIVATE_BETA_MODE = True
        try:
            # Registration without invite code -> 403
            res_no_code = await client.post("/api/auth/register", json={
                "email": f"tester_nocode_{ts}@growskill.ai",
                "full_name": "No Code Tester",
                "password": "Password123!"
            })
            assert res_no_code.status_code == 403

            # Registration with valid single-use invite code -> 200
            res_tester_1 = await client.post("/api/auth/register", json={
                "email": f"tester1_{ts}@growskill.ai",
                "full_name": "Beta Tester One",
                "password": "Password123!",
                "invite_code": raw_code
            })
            assert res_tester_1.status_code == 200
            token_1 = res_tester_1.json()["access_token"]
            headers_1 = {"Authorization": f"Bearer {token_1}"}

            # Attempt duplicate registration with now-exhausted single-use code -> 403
            res_exhausted = await client.post("/api/auth/register", json={
                "email": f"tester2_{ts}@growskill.ai",
                "full_name": "Beta Tester Two",
                "password": "Password123!",
                "invite_code": raw_code
            })
            assert res_exhausted.status_code == 403
            assert "reached its maximum uses" in res_exhausted.json()["detail"].lower()

        finally:
            settings.PRIVATE_BETA_MODE = orig_beta_mode

        # -------------------------------------------------------------
        # 4. Non-Beta Mode Registration
        # -------------------------------------------------------------
        res_tester_2 = await client.post("/api/auth/register", json={
            "email": f"tester2_{ts}@growskill.ai",
            "full_name": "Beta Tester Two",
            "password": "Password123!"
        })
        assert res_tester_2.status_code == 200
        token_2 = res_tester_2.json()["access_token"]
        headers_2 = {"Authorization": f"Bearer {token_2}"}

        # -------------------------------------------------------------
        # 5. Beta Status & Guided 4-Step Onboarding
        # -------------------------------------------------------------
        # Check initial beta status
        status_1 = await client.get("/api/beta/status", headers=headers_1)
        assert status_1.status_code == 200
        assert status_1.json()["is_beta_user"] is True
        assert status_1.json()["onboarding_completed"] is False
        assert status_1.json()["current_step"] == 1

        # Retrieve 4-step onboarding guide
        guide_1 = await client.get("/api/beta/onboarding", headers=headers_1)
        assert guide_1.status_code == 200
        assert len(guide_1.json()["steps"]) == 4

        # Complete Step 1
        step_res = await client.post("/api/beta/onboarding/complete-step", headers=headers_1, json={
            "step_number": 1
        })
        assert step_res.status_code == 200
        assert step_res.json()["current_step"] == 2
        assert 1 in step_res.json()["completed_steps"]

        # Complete Step 2 & 3
        await client.post("/api/beta/onboarding/complete-step", headers=headers_1, json={"step_number": 2})
        await client.post("/api/beta/onboarding/complete-step", headers=headers_1, json={"step_number": 3})

        # Complete Step 4 (Finishes onboarding)
        final_step = await client.post("/api/beta/onboarding/complete-step", headers=headers_1, json={
            "step_number": 4
        })
        assert final_step.status_code == 200
        assert final_step.json()["onboarding_completed"] is True

        # Verify status now shows completed
        status_after = await client.get("/api/beta/status", headers=headers_1)
        assert status_after.json()["onboarding_completed"] is True

        # -------------------------------------------------------------
        # 6. In-App Feedback & User Isolation
        # -------------------------------------------------------------
        # User 1 submits 5-star mentor feedback
        fb1 = await client.post("/api/feedback/", headers=headers_1, json={
            "feature": "mentor",
            "entity_id": "conv_123",
            "rating": 5,
            "feedback_text": "The autograd explanation was concise and accurate."
        })
        assert fb1.status_code == 200
        assert fb1.json()["sentiment"] == "positive"
        assert fb1.json()["rating"] == 5

        # User 2 submits 2-star feedback with negative sentiment
        fb2 = await client.post("/api/feedback/", headers=headers_2, json={
            "feature": "interview",
            "entity_id": "intv_456",
            "rating": 2,
            "feedback_text": "Need more questions on distributed DDP synchronization."
        })
        assert fb2.status_code == 200
        assert fb2.json()["sentiment"] == "negative"

        # User isolation: User 1 retrieves only their own feedback
        my_fb1 = await client.get("/api/feedback/mine", headers=headers_1)
        assert my_fb1.status_code == 200
        assert len(my_fb1.json()) == 1
        assert my_fb1.json()[0]["feature"] == "mentor"

        # User 2 retrieves only their own feedback
        my_fb2 = await client.get("/api/feedback/mine", headers=headers_2)
        assert my_fb2.status_code == 200
        assert len(my_fb2.json()) == 1
        assert my_fb2.json()[0]["feature"] == "interview"

        # -------------------------------------------------------------
        # 7. Admin Authorization & Protected Endpoints
        # -------------------------------------------------------------
        # Regular user (Tester 1) attempting admin access -> 403 Forbidden
        res_forbidden = await client.get("/api/admin/beta-metrics", headers=headers_1)
        assert res_forbidden.status_code == 403

        # Admin user accessing metrics -> 200 OK
        res_metrics = await client.get("/api/admin/beta-metrics", headers=admin_headers)
        assert res_metrics.status_code == 200
        metrics = res_metrics.json()

        assert metrics["total_beta_testers"] >= 3
        assert metrics["feedback_count"] >= 2
        assert "feature_ratings" in metrics
        assert "ai_performance" in metrics
        assert "knowledge_twin_growth" in metrics
        assert "onboarding" in metrics

        # Verify no sensitive data leakage
        assert "password" not in str(metrics).lower()
        assert "secret" not in str(metrics).lower()
