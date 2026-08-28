from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.db.models import User
from app.core.security import get_current_user
from app.services.knowledge_twin import knowledge_twin_service
from app.schemas.schemas import KnowledgeTwinSummary, AddEvidenceRequest

router = APIRouter(prefix="/api/knowledge-twin", tags=["knowledge-twin"])

from app.services.telemetry import telemetry_service

@router.get("/", response_model=KnowledgeTwinSummary)
async def get_twin_summary(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    data = await knowledge_twin_service.get_user_twin(db, current_user.id)
    if not data:
        raise HTTPException(status_code=404, detail="Knowledge Twin profile not found.")
    await telemetry_service.track_event(db, current_user.id, "knowledge_twin_viewed")
    return data

@router.get("/skills")
async def get_skills_list(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    data = await knowledge_twin_service.get_user_twin(db, current_user.id)
    if not data:
        raise HTTPException(status_code=404, detail="Knowledge Twin not found.")
    return data.get("skills", [])

@router.post("/evidence")
async def add_evidence(
    req: AddEvidenceRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    res = await knowledge_twin_service.record_evidence(
        db=db,
        user_id=current_user.id,
        skill_code=req.skill_code,
        evidence_type=req.evidence_type,
        title=req.title,
        detail=req.detail,
        score=req.score,
        confidence=req.confidence
    )
    return res
