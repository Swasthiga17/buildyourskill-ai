from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict, List, Optional

router = APIRouter(prefix="/api/roadmap", tags=["personalization"])

class PersonalizationRequest(BaseModel):
    target_role: str = "AI/ML Engineer"
    existing_skills: Dict[str, float] = {
        "python": 85.0,
        "math": 65.0,
        "ml": 40.0,
        "dl": 30.0
    }

@router.post("/personalize")
async def personalize_roadmap(req: PersonalizationRequest):
    python_score = req.existing_skills.get("python", 0.0)
    
    # Gating & Skipping Engine Logic
    python_skipped = python_score >= 80.0
    
    if python_skipped:
        active_focus = "03 Machine Learning & PyTorch"
        recommendation = "You have proven mastery in Python (85%). Skipped beginner Python and unlocked Core Machine Learning as your active focus!"
        unlocked_stage_ids = [1, 2, 3]
        completed_stage_ids = [1]
    else:
        active_focus = "01 Python & Programming"
        recommendation = "Focus on Python programming foundations before moving to Machine Learning."
        unlocked_stage_ids = [1]
        completed_stage_ids = []

    return {
        "status": "success",
        "target_role": req.target_role,
        "python_skipped": python_skipped,
        "active_focus": active_focus,
        "recommendation": recommendation,
        "unlocked_stage_ids": unlocked_stage_ids,
        "completed_stage_ids": completed_stage_ids,
        "priority_gaps": [
            {"skill": "PyTorch", "gap": 52.0},
            {"skill": "MLOps", "gap": 38.0},
            {"skill": "AI System Design", "gap": 41.0}
        ]
    }
