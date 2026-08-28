import logging
from typing import Dict, Any, List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from app.db.models import (
    User, UserProfile, Skill, UserSkill, SkillEvidence,
    Roadmap, RoadmapStep, LearningTopic, LearningProgress,
    AssessmentSubmission, Project, KnowledgeDocument,
    MentorConversation, MentorMessage, InterviewResult, RoleBenchmark
)

logger = logging.getLogger("growskill.learner_context")

class LearnerContextService:
    """Unified Single Learner Context Loader.
    
    Loads all learning signals, knowledge twin state, roadmaps, evidence, 
    and history into a normalized single source of truth context object.
    """

    async def get_learner_context(self, db: AsyncSession, user_id: int) -> Dict[str, Any]:
        """Fetch complete unified learner profile, skills, roadmap, evidence, and recent interactions."""
        # 1. Fetch User with all relationships loaded
        res = await db.execute(
            select(User)
            .options(
                selectinload(User.profile),
                selectinload(User.skills).selectinload(UserSkill.skill),
                selectinload(User.evidence).selectinload(SkillEvidence.skill),
                selectinload(User.learning_progress).selectinload(LearningProgress.topic),
                selectinload(User.assessments),
                selectinload(User.projects),
                selectinload(User.documents),
                selectinload(User.conversations).selectinload(MentorConversation.messages),
                selectinload(User.interview_results)
            )
            .where(User.id == user_id)
        )
        user = res.scalar_one_or_none()
        if not user:
            return None

        profile = user.profile
        target_role = profile.target_role if profile else "AI/ML Engineer"

        # 2. Fetch Target Role Benchmark
        res_bm = await db.execute(select(RoleBenchmark).where(RoleBenchmark.role_name == target_role))
        benchmark = res_bm.scalar_one_or_none()
        if not benchmark:
            res_bm_any = await db.execute(select(RoleBenchmark))
            benchmark = res_bm_any.scalars().first()

        req_skills: Dict[str, float] = benchmark.required_skills if benchmark else {}
        weights: Dict[str, float] = benchmark.importance_weights if benchmark else {}

        # 3. Structure Skills & Skill Gaps
        skills_summary = {}
        skill_gaps_list = []
        for us in user.skills:
            code = us.skill.code
            req_score = req_skills.get(code, 75.0)
            weight = weights.get(code, 1.0)
            gap = max(0.0, req_score - us.current_score)
            
            skills_summary[code] = {
                "skill_code": code,
                "name": us.skill.name,
                "category": us.skill.category,
                "current_score": round(us.current_score, 1),
                "target_score": round(req_score, 1),
                "gap": round(gap, 1),
                "confidence": round(us.confidence, 2),
                "status": us.status,
                "evidence_count": us.evidence_count
            }

            skill_gaps_list.append({
                "skill_code": code,
                "name": us.skill.name,
                "gap": round(gap, 1),
                "current_score": round(us.current_score, 1),
                "required_score": round(req_score, 1),
                "weight": weight,
                "is_critical": gap >= 30.0 or (gap * weight >= 35.0)
            })

        # Sort gaps by magnitude * weight
        skill_gaps_list.sort(key=lambda g: g["gap"] * g["weight"], reverse=True)

        # 4. Recent Assessment & Interview Highlights
        recent_assessments = [
            {
                "id": a.id,
                "stage_id": a.stage_id,
                "score": a.score,
                "feedback": a.feedback,
                "created_at": a.created_at
            }
            for a in sorted(user.assessments or [], key=lambda x: x.created_at, reverse=True)[:3]
        ]

        recent_interviews = [
            {
                "id": i.id,
                "question": i.question_title,
                "category": i.category,
                "score": i.overall_score,
                "missing_concepts": i.missing_concepts or [],
                "feedback": i.feedback_text,
                "created_at": i.created_at
            }
            for i in sorted(user.interview_results or [], key=lambda x: x.created_at, reverse=True)[:3]
        ]

        recent_evidence = [
            {
                "id": ev.id,
                "skill_code": ev.skill.code if ev.skill else "unknown",
                "evidence_type": ev.evidence_type,
                "title": ev.title,
                "score": ev.score_delta,
                "confidence": ev.confidence,
                "created_at": ev.created_at
            }
            for ev in sorted(user.evidence or [], key=lambda x: x.created_at, reverse=True)[:5]
        ]

        recent_projects = [
            {
                "id": p.id,
                "title": p.title,
                "status": p.status,
                "difficulty": p.difficulty,
                "category": p.category
            }
            for p in sorted(user.projects or [], key=lambda x: x.created_at, reverse=True)[:3]
        ]

        # 5. Fetch Roadmap Overview
        res_rm = await db.execute(
            select(Roadmap).options(selectinload(Roadmap.steps).selectinload(RoadmapStep.topics))
        )
        roadmap = res_rm.scalars().first()
        active_step_title = "03 Machine Learning & PyTorch"
        completed_stage_count = 0
        if roadmap:
            for s in roadmap.steps:
                if s.status in ["completed", "skipped"]:
                    completed_stage_count += 1
                elif s.status == "active":
                    active_step_title = f"{s.stage_code} {s.title}"

        # 6. Assemble Single Normalized Context Object
        return {
            "user": {
                "id": user.id,
                "email": user.email,
                "full_name": user.full_name
            },
            "profile": {
                "target_role": target_role,
                "experience_level": profile.experience_level if profile else "Intermediate",
                "knowledge_score": profile.knowledge_score if profile else 72.0,
                "readiness_score": profile.readiness_score if profile else 68.0,
                "streak_days": profile.streak_days if profile else 12,
                "total_hours": profile.total_hours if profile else 47.0,
                "domain_scores": profile.domain_scores if profile else {}
            },
            "skills": skills_summary,
            "top_gaps": skill_gaps_list[:4],
            "roadmap": {
                "active_step": active_step_title,
                "completed_stages_count": completed_stage_count
            },
            "recent_evidence": recent_evidence,
            "recent_assessments": recent_assessments,
            "recent_interviews": recent_interviews,
            "recent_projects": recent_projects,
            "documents_count": len(user.documents or [])
        }

learner_context_service = LearnerContextService()
