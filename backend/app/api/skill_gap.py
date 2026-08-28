from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from app.db.session import get_db
from app.db.models import User
from app.core.security import get_current_user
from app.services.skill_gap import skill_gap_engine
from app.schemas.schemas import SkillGapsResponse

router = APIRouter(prefix="/api/skill-gaps", tags=["skill-gaps"])

@router.get("/", response_model=SkillGapsResponse)
async def get_skill_gaps(
    target_role: Optional[str] = Query(None, description="Filter by target career role"),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    data = await skill_gap_engine.calculate_gaps(db, current_user.id, target_role=target_role)
    if not data:
        raise HTTPException(status_code=404, detail="Unable to compute skill gaps.")
    return data
