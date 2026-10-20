from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Dict, Any
from app.db.session import get_db
from app.db.models import User
from app.core.security import get_current_user
from app.services.today_plan import today_plan_service

from app.services.telemetry import telemetry_service

router = APIRouter(prefix="/api/today-plan", tags=["today-plan"])

@router.get("/")
async def get_today_plan(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    plan = await today_plan_service.get_today_plan(db, current_user.id)
    await telemetry_service.track_event(db, current_user.id, "today_plan_started")
    return plan
