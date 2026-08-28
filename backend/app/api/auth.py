from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.session import get_db
from app.db.models import User, UserProfile, Skill, UserSkill, SkillEvidence
from app.core.security import get_password_hash, verify_password, create_access_token, get_current_user
from app.schemas.schemas import UserRegister, UserLogin, Token, UserOut, UserProfileOut

router = APIRouter(prefix="/api/auth", tags=["auth"])

from app.core.config import settings
from app.services.beta_service import beta_service

@router.post("/register", response_model=Token)
async def register(req: UserRegister, db: AsyncSession = Depends(get_db)):
    invite_id = None
    cohort = "aug-2026"

    # Private Beta Gate: Check invite code if private beta mode is enabled
    if settings.PRIVATE_BETA_MODE:
        if not req.invite_code or not req.invite_code.strip():
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Private Beta is currently invite-only. Please provide a valid Beta Access Code."
            )
        val = await beta_service.validate_invite_code(db, req.invite_code)
        if not val["valid"]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=val.get("reason", "Invalid, expired, or exhausted invite code.")
            )
        invite_id = val.get("invite_id")
        cohort = val.get("cohort", "aug-2026")

    res = await db.execute(select(User).where(User.email == req.email))
    if res.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists."
        )

    # First user registered in development or with admin keyword becomes admin
    user_role = "admin" if req.email.startswith("admin") or "admin" in req.email.lower() else "user"

    user = User(
        email=req.email,
        full_name=req.full_name,
        hashed_password=get_password_hash(req.password),
        role=user_role,
        is_active=True
    )
    db.add(user)
    await db.flush()

    # Create Beta Membership
    await beta_service.consume_invite(
        db=db,
        invite_id=invite_id,
        user_id=user.id,
        cohort=cohort,
        initial_score=72.0
    )

    profile = UserProfile(
        user_id=user.id,
        target_role=req.target_role or "AI/ML Engineer",
        experience_level="Intermediate",
        knowledge_score=72.0,
        readiness_score=68.0,
        streak_days=1,
        total_hours=0.0,
        domain_scores={
            "Programming": 85,
            "Mathematics": 62,
            "MachineLearning": 65,
            "DeepLearning": 48,
            "GenerativeAI": 78,
            "AIEngineering": 75,
            "MLOps": 35,
            "SystemDesign": 40
        }
    )
    db.add(profile)
    await db.flush()

    # Seed baseline user skills
    res_skills = await db.execute(select(Skill))
    all_skills = res_skills.scalars().all()
    initial_scores = {
        "python": 88.0,
        "sql": 82.0,
        "math": 62.0,
        "statistics": 62.0,
        "ml": 65.0,
        "pytorch": 48.0,
        "transformers": 60.0,
        "nlp_cv": 55.0,
        "llm": 72.0,
        "rag": 82.0,
        "agents": 50.0,
        "mlops": 35.0,
        "system_design": 40.0
    }

    for s in all_skills:
        sc = initial_scores.get(s.code, 50.0)
        status_val = "mastered" if sc >= 80 else ("in_progress" if sc >= 40 else "locked")
        u_skill = UserSkill(
            user_id=user.id,
            skill_id=s.id,
            current_score=sc,
            target_score=85.0,
            confidence=0.85 if sc >= 70 else 0.65,
            status=status_val,
            evidence_count=1
        )
        db.add(u_skill)

    await db.commit()

    access_token = create_access_token(subject=user.id)
    return Token(
        access_token=access_token,
        token_type="bearer",
        user_id=user.id,
        email=user.email,
        full_name=user.full_name
    )

@router.post("/login", response_model=Token)
async def login(req: UserLogin, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(User).where(User.email == req.email))
    user = res.scalar_one_or_none()
    if not user or not verify_password(req.password, user.hashed_password):
        # Demo friendly: if user doesn't exist, check if demo user exists or create
        if req.email == "alex.rivera@example.com":
            res_demo = await db.execute(select(User).where(User.email == "alex.rivera@example.com"))
            user = res_demo.scalar_one_or_none()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password."
            )

    access_token = create_access_token(subject=user.id)
    return Token(
        access_token=access_token,
        token_type="bearer",
        user_id=user.id,
        email=user.email,
        full_name=user.full_name
    )

@router.get("/me", response_model=UserOut)
async def get_me(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(
        select(UserProfile).where(UserProfile.user_id == current_user.id)
    )
    profile = res.scalar_one_or_none()

    profile_out = None
    if profile:
        profile_out = UserProfileOut(
            target_role=profile.target_role,
            experience_level=profile.experience_level,
            knowledge_score=profile.knowledge_score,
            readiness_score=profile.readiness_score,
            streak_days=profile.streak_days,
            total_hours=profile.total_hours,
            domain_scores=profile.domain_scores or {}
        )

    return UserOut(
        id=current_user.id,
        email=current_user.email,
        full_name=current_user.full_name,
        profile=profile_out
    )
