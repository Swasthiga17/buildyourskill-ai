from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Dict, Any, Optional
from app.db.session import get_db
from app.db.models import User, LearningProgress, LearningTopic
from app.core.security import get_current_user
from app.services.roadmap_engine import roadmap_engine
from app.services.knowledge_twin import knowledge_twin_service
from app.schemas.schemas import RoadmapResponse, PersonalizeRoadmapRequest

from app.services.telemetry import telemetry_service

@router.get("/", response_model=RoadmapResponse)
async def get_roadmap(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    data = await roadmap_engine.get_adaptive_roadmap(db, current_user.id)
    if not data:
        raise HTTPException(status_code=404, detail="Roadmap not found.")
    await telemetry_service.track_event(db, current_user.id, "roadmap_viewed")
    return data

@router.post("/personalize")
async def personalize_roadmap(
    req: PersonalizeRoadmapRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    if req.existing_skills:
        for skill_code, score in req.existing_skills.items():
            await knowledge_twin_service.record_evidence(
                db=db,
                user_id=current_user.id,
                skill_code=skill_code.lower(),
                evidence_type="assessment",
                title=f"Onboarding Diagnostic: {skill_code}",
                detail=f"Self-assessed / tested mastery score: {score}%",
                score=score,
                confidence="high"
            )

    roadmap_data = await roadmap_engine.get_adaptive_roadmap(db, current_user.id, target_role=req.target_role)
    
    python_skipped = any(s["stage_code"] == "01" and s["status"] == "skipped" for s in roadmap_data["steps"])
    unlocked_ids = [s["id"] for s in roadmap_data["steps"] if s["status"] in ["unlocked", "active", "completed", "skipped"]]
    completed_ids = [s["id"] for s in roadmap_data["steps"] if s["status"] in ["completed", "skipped"]]

    return {
        "status": "success",
        "target_role": req.target_role,
        "python_skipped": python_skipped,
        "active_focus": roadmap_data.get("active_stage", "03 Machine Learning & PyTorch"),
        "recommendation": roadmap_data.get("recommendation", "Progress through unlocked milestones."),
        "unlocked_stage_ids": unlocked_ids,
        "completed_stage_ids": completed_ids,
        "roadmap": roadmap_data
    }

@router.post("/progress")
async def mark_topic_progress(
    req: Dict[str, Any],
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    stage_id = str(req.get("stage_id", "01"))
    topic_name = str(req.get("topic_name", ""))
    score = float(req.get("score", 100.0))

    # Record evidence in knowledge twin
    skill_code_map = {
        "01": "python", "02": "math", "03": "ml", "04": "pytorch",
        "05": "transformers", "06": "nlp_cv", "07": "llm", "08": "rag",
        "09": "agents", "10": "mlops", "11": "system_design"
    }
    target_skill = skill_code_map.get(stage_id, "python")

    await knowledge_twin_service.record_evidence(
        db=db,
        user_id=current_user.id,
        skill_code=target_skill,
        evidence_type="quiz",
        title=f"Completed Topic: {topic_name}",
        detail=f"Scored {score}% on topic checkpoint.",
        score=score,
        confidence="medium"
    )

    twin = await knowledge_twin_service.get_user_twin(db, current_user.id)
    return {
        "status": "success",
        "message": f"Updated progress for {topic_name}",
        "new_knowledge_score": twin["knowledge_score"]
    }

@router.post("/assessment")
async def submit_stage_assessment(
    req: Dict[str, Any],
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    stage_id = str(req.get("stage_id", "01"))
    score = float(req.get("score", 85.0))

    skill_code_map = {
        "01": "python", "02": "math", "03": "ml", "04": "pytorch",
        "05": "transformers", "06": "nlp_cv", "07": "llm", "08": "rag",
        "09": "agents", "10": "mlops", "11": "system_design"
    }
    target_skill = skill_code_map.get(stage_id, "python")

    await knowledge_twin_service.record_evidence(
        db=db,
        user_id=current_user.id,
        skill_code=target_skill,
        evidence_type="assessment",
        title=f"Stage {stage_id} Mastery Assessment",
        detail=f"Completed comprehensive stage diagnostic with score {score}%.",
        score=score,
        confidence="high"
    )

    twin = await knowledge_twin_service.get_user_twin(db, current_user.id)
    return {
        "status": "success",
        "submitted_score": score,
        "updated_knowledge_score": twin["knowledge_score"]
    }
