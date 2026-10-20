from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime
from app.db.session import get_db
from app.db.models import User, Feedback
from app.core.security import get_current_user

router = APIRouter(prefix="/api/feedback", tags=["feedback"])

ALLOWED_FEATURES = {"mentor", "interview", "project", "roadmap", "rag", "assessment", "general", "bug"}

from app.services.telemetry import telemetry_service

class FeedbackCreateRequest(BaseModel):
    feature: str = "general"
    entity_id: Optional[str] = None
    rating: int = Field(default=5, ge=1, le=5)
    sentiment: Optional[str] = None # positive, neutral, negative
    quality_category: Optional[str] = "accuracy" # accuracy, relevance, clarity, personalization, technical_depth
    correctness: Optional[str] = "correct" # correct, partially_correct, incorrect (hallucination flagging)
    feedback_text: str = Field(min_length=3, max_length=2000)
    metadata: Optional[Dict[str, Any]] = None

class FeedbackResponse(BaseModel):
    id: int
    user_id: int
    feature: str
    entity_id: Optional[str] = None
    rating: int
    sentiment: str = "neutral"
    quality_category: Optional[str] = "accuracy"
    correctness: Optional[str] = "correct"
    feedback_text: str
    created_at: datetime

@router.post("/", response_model=FeedbackResponse)
async def submit_feedback(
    req: FeedbackCreateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Submits beta tester feedback, ratings, and AI accuracy evaluations."""
    clean_feature = req.feature.lower().strip()
    if clean_feature not in ALLOWED_FEATURES:
        clean_feature = "general"

    # Infer sentiment if not provided
    sentiment = req.sentiment
    if not sentiment or sentiment not in ("positive", "neutral", "negative"):
        if req.rating >= 4:
            sentiment = "positive"
        elif req.rating == 3:
            sentiment = "neutral"
        else:
            sentiment = "negative"

    quality_cat = req.quality_category.lower().strip() if req.quality_category else "accuracy"
    correctness_val = req.correctness.lower().strip() if req.correctness else "correct"

    feedback_entry = Feedback(
        user_id=current_user.id,
        feature=clean_feature,
        entity_id=req.entity_id,
        rating=req.rating,
        sentiment=sentiment,
        quality_category=quality_cat,
        correctness=correctness_val,
        feedback_text=req.feedback_text.strip(),
        metadata_json=req.metadata or {}
    )
    db.add(feedback_entry)
    await db.commit()

    # Track telemetry event
    await telemetry_service.track_event(
        db=db,
        user_id=current_user.id,
        event_name="feedback_submitted",
        properties={
            "feature": clean_feature,
            "rating": req.rating,
            "sentiment": sentiment,
            "quality_category": quality_cat,
            "correctness": correctness_val
        }
    )

    return FeedbackResponse(
        id=feedback_entry.id,
        user_id=feedback_entry.user_id,
        feature=feedback_entry.feature,
        entity_id=feedback_entry.entity_id,
        rating=feedback_entry.rating,
        sentiment=feedback_entry.sentiment,
        quality_category=feedback_entry.quality_category,
        correctness=feedback_entry.correctness,
        feedback_text=feedback_entry.feedback_text,
        created_at=feedback_entry.created_at
    )

@router.get("/mine", response_model=List[FeedbackResponse])
async def get_my_feedback(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Retrieves all feedback records submitted strictly by the authenticated user."""
    res = await db.execute(
        select(Feedback)
        .where(Feedback.user_id == current_user.id)
        .order_by(Feedback.created_at.desc())
    )
    feedbacks = res.scalars().all()
    return [
        FeedbackResponse(
            id=f.id,
            user_id=f.user_id,
            feature=f.feature,
            entity_id=f.entity_id,
            rating=f.rating,
            sentiment=f.sentiment or "neutral",
            quality_category=getattr(f, "quality_category", "accuracy") or "accuracy",
            correctness=getattr(f, "correctness", "correct") or "correct",
            feedback_text=f.feedback_text,
            created_at=f.created_at
        )
        for f in feedbacks
    ]
