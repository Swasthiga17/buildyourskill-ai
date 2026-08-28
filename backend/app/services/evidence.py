import logging
from datetime import datetime, timedelta
from typing import Dict, Any, Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.models import User, UserProfile, Skill, UserSkill, SkillEvidence

logger = logging.getLogger("growskill.evidence")

class EvidenceEngine:
    """Unified Evidence Management & Anti-Manipulation Engine.
    
    Enforces source-specific weighting, Bayesian score updates, spam deduplication,
    and instantaneous score boost caps.
    """

    # Source-specific credibility weights (0.0 to 1.0)
    SOURCE_WEIGHTS = {
        "assessment": 0.35,
        "interview": 0.35,
        "project": 0.25,
        "github": 0.20,
        "coding_challenge": 0.20,
        "quiz": 0.15,
        "completed_lesson": 0.05,
        "document": 0.05,
        "self_reported": 0.02
    }

    # Maximum score increment permitted in a single event
    MAX_SINGLE_EVENT_BOOST = 12.0

    async def record_learning_evidence(
        self,
        db: AsyncSession,
        user_id: int,
        skill_code: str,
        source_type: str,
        title: str,
        detail: str,
        score: float,
        source_id: Optional[str] = None,
        confidence: str = "medium",
        metadata: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """Validates, deduplicates, and ingests learning evidence, then updates the Knowledge Twin."""
        # 1. Resolve Skill
        res_skill = await db.execute(select(Skill).where(Skill.code == skill_code.lower()))
        skill = res_skill.scalar_one_or_none()
        if not skill:
            logger.warning(f"Skill '{skill_code}' not found during evidence logging.")
            return {"status": "error", "message": f"Skill '{skill_code}' not found"}

        # 2. Anti-Manipulation: Duplicate Submission Detection within 5 minutes
        five_mins_ago = datetime.utcnow() - timedelta(minutes=5)
        res_dup = await db.execute(
            select(SkillEvidence).where(
                SkillEvidence.user_id == user_id,
                SkillEvidence.skill_id == skill.id,
                SkillEvidence.evidence_type == source_type,
                SkillEvidence.title == title,
                SkillEvidence.created_at >= five_mins_ago
            )
        )
        if res_dup.scalars().first():
            logger.info(f"Duplicate evidence detected for user {user_id} on {skill_code} within 5 mins. Skipping duplicate boost.")
            return {"status": "skipped", "message": "Duplicate evidence throttled"}

        # 3. Retrieve or Initialize UserSkill
        res_us = await db.execute(
            select(UserSkill).where(UserSkill.user_id == user_id, UserSkill.skill_id == skill.id)
        )
        user_skill = res_us.scalar_one_or_none()
        if not user_skill:
            user_skill = UserSkill(
                user_id=user_id,
                skill_id=skill.id,
                current_score=min(score, 70.0),
                target_score=85.0,
                confidence=0.6,
                status="in_progress",
                evidence_count=1
            )
            db.add(user_skill)
        else:
            # 4. Weighted Bayesian Score Update with Anti-Inflation Cap
            source_weight = self.SOURCE_WEIGHTS.get(source_type, 0.15)
            confidence_multiplier = 1.2 if confidence == "high" else (1.0 if confidence == "medium" else 0.8)
            alpha = min(0.4, source_weight * confidence_multiplier)

            raw_target_score = user_skill.current_score * (1.0 - alpha) + score * alpha
            delta = raw_target_score - user_skill.current_score

            # Cap maximum jump per single event
            if delta > self.MAX_SINGLE_EVENT_BOOST:
                delta = self.MAX_SINGLE_EVENT_BOOST

            user_skill.current_score = round(max(0.0, min(100.0, user_skill.current_score + delta)), 1)
            user_skill.confidence = min(1.0, round(user_skill.confidence + (0.05 * source_weight), 2))
            user_skill.evidence_count += 1
            user_skill.last_assessed = datetime.utcnow()
            user_skill.status = "mastered" if user_skill.current_score >= 80.0 else ("in_progress" if user_skill.current_score >= 40.0 else "locked")

        # 5. Store Persistent Evidence Record
        evidence_entry = SkillEvidence(
            user_id=user_id,
            skill_id=skill.id,
            evidence_type=source_type,
            source_id=source_id,
            title=title,
            detail=detail,
            score_delta=score,
            confidence=confidence,
            metadata_json=metadata or {}
        )
        db.add(evidence_entry)
        await db.flush()

        # 6. Recalculate User Profile Knowledge Score
        res_all_skills = await db.execute(
            select(UserSkill).where(UserSkill.user_id == user_id)
        )
        all_user_skills = res_all_skills.scalars().all()
        if all_user_skills:
            avg_score = sum(s.current_score for s in all_user_skills) / len(all_user_skills)
            res_prof = await db.execute(select(UserProfile).where(UserProfile.user_id == user_id))
            profile = res_prof.scalar_one_or_none()
            if profile:
                profile.knowledge_score = round(avg_score, 1)
                profile.readiness_score = round(min(100.0, avg_score * 0.95), 1)

        await db.commit()

        return {
            "status": "success",
            "skill_code": skill_code,
            "updated_score": user_skill.current_score,
            "confidence": user_skill.confidence,
            "evidence_count": user_skill.evidence_count
        }

evidence_engine = EvidenceEngine()
