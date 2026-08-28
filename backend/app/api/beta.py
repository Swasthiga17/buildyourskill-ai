from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Dict, Any
from pydantic import BaseModel, Field
from app.db.session import get_db
from app.db.models import User
from app.core.security import get_current_user
from app.services.beta_service import beta_service

router = APIRouter(prefix="/api/beta", tags=["beta"])

class ValidateInviteRequest(BaseModel):
    invite_code: str

class ValidateInviteResponse(BaseModel):
    valid: bool
    cohort: str = "aug-2026"
    remaining_uses: int = 0
    reason: str = ""

class OnboardingStepRequest(BaseModel):
    step_number: int = Field(ge=1, le=4)
    mark_all_done: bool = False

@router.post("/validate-invite", response_model=ValidateInviteResponse)
async def validate_invite(
    req: ValidateInviteRequest,
    db: AsyncSession = Depends(get_db)
):
    """Public endpoint to validate an invite code before user registration."""
    val = await beta_service.validate_invite_code(db, req.invite_code)
    return ValidateInviteResponse(
        valid=val["valid"],
        cohort=val.get("cohort", "aug-2026"),
        remaining_uses=val.get("remaining_uses", 0),
        reason=val.get("reason", "")
    )

@router.get("/status")
async def get_beta_status(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Returns current user's beta membership and onboarding state."""
    return await beta_service.get_beta_status(db, current_user.id)

@router.get("/onboarding")
async def get_onboarding_guide(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Returns the 4-step guided onboarding curriculum and current user progress."""
    status_info = await beta_service.get_beta_status(db, current_user.id)
    steps = [
        {
            "step": 1,
            "title": "Complete Initial Skill Assessment",
            "description": "Run a 3-minute diagnostic test in Python, PyTorch, or Machine Learning to establish your baseline.",
            "action_url": "/assessments",
            "completed": 1 in status_info.get("completed_steps", [])
        },
        {
            "step": 2,
            "title": "Inspect Knowledge Twin & Skill Gaps",
            "description": "Review your mathematical skill matrix, identify high-priority gaps, and see dynamic Bayesian confidence scores.",
            "action_url": "/knowledge-twin",
            "completed": 2 in status_info.get("completed_steps", [])
        },
        {
            "step": 3,
            "title": "Ask AI Mentor for Architecture Advice",
            "description": "Engage with your context-grounded AI Mentor to discuss distributed training, PyTorch autograd, or ML system design.",
            "action_url": "/mentor",
            "completed": 3 in status_info.get("completed_steps", [])
        },
        {
            "step": 4,
            "title": "Launch Today's Personalized Plan",
            "description": "Start your daily adaptive curriculum generated specifically for your target role and prioritized gaps.",
            "action_url": "/today-plan",
            "completed": 4 in status_info.get("completed_steps", [])
        }
    ]
    return {
        "onboarding_completed": status_info.get("onboarding_completed", False),
        "current_step": status_info.get("current_step", 1),
        "completed_steps": status_info.get("completed_steps", []),
        "steps": steps
    }

@router.post("/onboarding/complete-step")
async def complete_onboarding_step(
    req: OnboardingStepRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Marks an onboarding step as completed and persists progress in PostgreSQL."""
    res = await beta_service.complete_onboarding_step(
        db=db,
        user_id=current_user.id,
        step_number=req.step_number,
        mark_all_done=req.mark_all_done
    )
    return res
