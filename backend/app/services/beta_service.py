import hashlib
import secrets
import string
from datetime import datetime, timedelta
from typing import Optional, Dict, Any, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.models import BetaInvite, BetaMembership, User
from app.core.config import settings

class BetaService:
    """Secure Private Beta Management Engine:
    - Generates cryptographically random invite codes (e.g. BS-AI-7KQ9-X2M4)
    - Stores only SHA-256 code hashes (never raw plaintext codes)
    - Validates expiration, max uses, and cohort assignment
    - Tracks guided 4-step onboarding progress and activity timestamps
    """

    @staticmethod
    def hash_code(code: str) -> str:
        """Computes deterministic SHA-256 hash of normalized uppercase code."""
        normalized = code.strip().upper()
        return hashlib.sha256(normalized.encode("utf-8")).hexdigest()

    def generate_raw_invite_code(self) -> str:
        """Generates human-readable random code: BS-AI-XXXX-YYYY."""
        charset = string.ascii_uppercase + string.digits
        # Avoid ambiguous characters
        clean_charset = "".join(c for c in charset if c not in "01IO")
        part1 = "".join(secrets.choice(clean_charset) for _ in range(4))
        part2 = "".join(secrets.choice(clean_charset) for _ in range(4))
        return f"BS-AI-{part1}-{part2}"

    async def create_invite(
        self,
        db: AsyncSession,
        max_uses: int = 1,
        expiry_days: int = 30,
        cohort: str = "aug-2026",
        created_by: Optional[int] = None
    ) -> Dict[str, Any]:
        """Creates a new secure invite code and returns raw code once for distribution."""
        raw_code = self.generate_raw_invite_code()
        code_hash = self.hash_code(raw_code)
        code_prefix = raw_code[:9] # e.g. "BS-AI-7KQ"
        expires_at = datetime.utcnow() + timedelta(days=expiry_days)

        invite = BetaInvite(
            code_hash=code_hash,
            code_prefix=code_prefix,
            max_uses=max_uses,
            used_count=0,
            cohort=cohort,
            expires_at=expires_at,
            created_by=created_by,
            active=True
        )
        db.add(invite)
        await db.commit()

        return {
            "id": invite.id,
            "raw_invite_code": raw_code,
            "code_prefix": code_prefix,
            "max_uses": max_uses,
            "cohort": cohort,
            "expires_at": expires_at
        }

    async def validate_invite_code(
        self,
        db: AsyncSession,
        raw_code: str
    ) -> Dict[str, Any]:
        """Checks if a code is valid, active, non-expired, and has uses remaining."""
        if not raw_code or not raw_code.strip():
            return {"valid": False, "reason": "Invite code is required."}

        code_hash = self.hash_code(raw_code)
        res = await db.execute(select(BetaInvite).where(BetaInvite.code_hash == code_hash))
        invite = res.scalar_one_or_none()

        # Fallback check for configured default environment code if no DB record exists
        if not invite and settings.BETA_ACCESS_CODE:
            if raw_code.strip().upper() == settings.BETA_ACCESS_CODE.strip().upper():
                return {
                    "valid": True,
                    "invite_id": None,
                    "cohort": "default-beta",
                    "remaining_uses": 999
                }

        if not invite:
            return {"valid": False, "reason": "Invalid or unrecognized invite code."}

        if invite.used_count >= invite.max_uses:
            return {"valid": False, "reason": "This invite code has reached its maximum uses."}

        if not invite.active:
            return {"valid": False, "reason": "This invite code has been deactivated."}

        if invite.expires_at < datetime.utcnow():
            return {"valid": False, "reason": "This invite code has expired."}

        return {
            "valid": True,
            "invite_id": invite.id,
            "cohort": invite.cohort,
            "remaining_uses": invite.max_uses - invite.used_count,
            "expires_at": invite.expires_at
        }

    async def consume_invite(
        self,
        db: AsyncSession,
        invite_id: Optional[int],
        user_id: int,
        cohort: str = "aug-2026",
        initial_score: float = 72.0
    ) -> BetaMembership:
        """Consumes one use of the invite and creates an active BetaMembership record."""
        if invite_id:
            res = await db.execute(select(BetaInvite).where(BetaInvite.id == invite_id))
            invite = res.scalar_one_or_none()
            if invite:
                invite.used_count += 1
                if invite.used_count >= invite.max_uses:
                    invite.active = False

        membership = BetaMembership(
            user_id=user_id,
            invite_id=invite_id,
            status="active",
            cohort=cohort,
            initial_knowledge_score=initial_score,
            onboarding_completed=False,
            current_onboarding_step=1,
            completed_onboarding_steps=[]
        )
        db.add(membership)
        await db.commit()
        return membership

    async def get_beta_status(
        self,
        db: AsyncSession,
        user_id: int
    ) -> Dict[str, Any]:
        """Retrieves beta status, onboarding completion, and cohort for a user."""
        res = await db.execute(select(BetaMembership).where(BetaMembership.user_id == user_id))
        membership = res.scalar_one_or_none()
        if not membership:
            return {
                "is_beta_user": False,
                "onboarding_completed": True,
                "cohort": "standard",
                "joined_at": None
            }

        # Update last active timestamp
        membership.last_active_at = datetime.utcnow()
        await db.commit()

        return {
            "is_beta_user": True,
            "status": membership.status,
            "cohort": membership.cohort,
            "onboarding_completed": membership.onboarding_completed,
            "current_step": membership.current_onboarding_step,
            "completed_steps": membership.completed_onboarding_steps or [],
            "initial_knowledge_score": membership.initial_knowledge_score,
            "joined_at": membership.joined_at
        }

    async def complete_onboarding_step(
        self,
        db: AsyncSession,
        user_id: int,
        step_number: int,
        mark_all_done: bool = False
    ) -> Dict[str, Any]:
        """Records progress in the 4-step guided onboarding flow."""
        res = await db.execute(select(BetaMembership).where(BetaMembership.user_id == user_id))
        membership = res.scalar_one_or_none()
        if not membership:
            return {"status": "not_beta_user"}

        completed_steps = set(membership.completed_onboarding_steps or [])
        completed_steps.add(step_number)
        membership.completed_onboarding_steps = sorted(list(completed_steps))

        if mark_all_done or len(membership.completed_onboarding_steps) >= 4 or step_number >= 4:
            membership.onboarding_completed = True
            membership.current_onboarding_step = 4
        else:
            membership.current_onboarding_step = max(step_number + 1, membership.current_onboarding_step)

        await db.commit()
        return {
            "status": "success",
            "current_step": membership.current_onboarding_step,
            "completed_steps": membership.completed_onboarding_steps,
            "onboarding_completed": membership.onboarding_completed
        }

beta_service = BetaService()
