from typing import List, Dict, Any, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from app.db.models import User, UserProfile, UserSkill, Roadmap, RoadmapStep, LearningTopic, LearningProgress

class AdaptiveRoadmapEngine:
    """Evaluates the 12-stage AI/ML mastery graph against dynamic user skill levels to compute personalized learning paths and actions."""

    STAGE_TO_SKILL_MAP = {
        "01": ["python"],
        "02": ["math", "statistics"],
        "03": ["ml"],
        "04": ["pytorch"],
        "05": ["transformers"],
        "06": ["nlp_cv"],
        "07": ["llm"],
        "08": ["rag"],
        "09": ["agents"],
        "10": ["mlops"],
        "11": ["system_design"],
        "12": ["system_design", "agents", "mlops"]
    }

    def determine_action(self, status: str, avg_score: float, confidence: float) -> str:
        """Determines the specific adaptive action: LEARN, REVIEW, PRACTICE, ASSESS, BUILD, SKIP."""
        if status == "skipped":
            return "SKIP"
        if status == "completed":
            return "REVIEW" if confidence < 0.75 else "BUILD"
        if status == "active":
            if avg_score < 40.0:
                return "LEARN"
            elif avg_score < 70.0:
                return "PRACTICE"
            else:
                return "ASSESS"
        if status == "unlocked":
            return "LEARN" if avg_score < 50.0 else "PRACTICE"
        return "LOCKED"

    async def get_adaptive_roadmap(
        self,
        db: AsyncSession,
        user_id: int,
        target_role: Optional[str] = None
    ) -> Dict[str, Any]:
        # Fetch user with profile and skills
        res_user = await db.execute(
            select(User)
            .options(
                selectinload(User.profile),
                selectinload(User.skills).selectinload(UserSkill.skill),
                selectinload(User.learning_progress)
            )
            .where(User.id == user_id)
        )
        user = res_user.scalar_one_or_none()
        if not user:
            return None

        # Fetch Roadmap with steps and topics
        res_roadmap = await db.execute(
            select(Roadmap)
            .options(selectinload(Roadmap.steps).selectinload(RoadmapStep.topics))
        )
        roadmap = res_roadmap.scalars().first()
        if not roadmap:
            return None

        user_skills_map = {us.skill.code: us for us in user.skills}
        completed_topic_ids = {lp.topic_id for lp in user.learning_progress if lp.completed}

        steps_out = []
        completed_count = 0
        total_progress_sum = 0.0
        active_stage_title = None

        # Track completed stages for prerequisite validation
        completed_stage_codes = set()

        # First pass: determine completed/skipped stages based on evidence scores
        for step in sorted(roadmap.steps, key=lambda s: s.stage_number):
            stage_skills = self.STAGE_TO_SKILL_MAP.get(step.stage_code, [])
            if stage_skills:
                scores = [user_skills_map[s].current_score for s in stage_skills if s in user_skills_map]
                avg_stage_score = sum(scores) / len(scores) if scores else 0.0
            else:
                avg_stage_score = 0.0

            if avg_stage_score >= 80.0:
                completed_stage_codes.add(step.stage_code)

        # Second pass: compute state (skipped, completed, active, unlocked, locked) and action
        active_assigned = False

        for step in sorted(roadmap.steps, key=lambda s: s.stage_number):
            stage_skills = self.STAGE_TO_SKILL_MAP.get(step.stage_code, [])
            if stage_skills:
                scores = [user_skills_map[s].current_score for s in stage_skills if s in user_skills_map]
                confs = [user_skills_map[s].confidence for s in stage_skills if s in user_skills_map]
                avg_stage_score = sum(scores) / len(scores) if scores else 0.0
                avg_conf = sum(confs) / len(confs) if confs else 0.5
            else:
                avg_stage_score = 0.0
                avg_conf = 0.5

            # Prerequisite satisfaction check
            prereqs = step.prerequisites or []
            prereqs_satisfied = all(p in completed_stage_codes for p in prereqs)

            # Determine status
            if avg_stage_score >= 85.0 and step.stage_code == "01":
                status = "skipped"
                progress = 100.0
                completed_count += 1
            elif avg_stage_score >= 80.0:
                status = "completed"
                progress = 100.0
                completed_count += 1
            elif prereqs_satisfied and not active_assigned:
                status = "active"
                active_assigned = True
                active_stage_title = f"{step.stage_code} {step.title}"
                progress = max(25.0, round(avg_stage_score, 1))
            elif prereqs_satisfied:
                status = "unlocked"
                progress = round(avg_stage_score, 1)
            else:
                status = "locked"
                progress = 0.0

            action = self.determine_action(status, avg_stage_score, avg_conf)
            total_progress_sum += progress

            # Format Topics
            topics_out = []
            for t in step.topics:
                is_comp = t.id in completed_topic_ids or status in ["completed", "skipped"]
                topics_out.append({
                    "id": t.id,
                    "name": t.name,
                    "difficulty": t.difficulty,
                    "completed": is_comp,
                    "score": 100.0 if is_comp else 0.0
                })

            steps_out.append({
                "id": step.id,
                "stage_code": step.stage_code,
                "stage_number": step.stage_number,
                "title": step.title,
                "icon": step.icon,
                "description": step.description,
                "estimated_hours": step.estimated_hours,
                "progress": progress,
                "status": status,
                "recommended_action": action,
                "prerequisites": step.prerequisites or [],
                "topics": topics_out
            })

        overall_roadmap_progress = round(total_progress_sum / max(1, len(steps_out)), 1)
        knowledge_score = user.profile.knowledge_score if user.profile else 72.0

        if active_stage_title:
            recommendation = f"Active Focus: Stage {active_stage_title}. Action: Focus on high-leverage milestones to close technical gaps."
        else:
            recommendation = "You have completed all prerequisite stages! Proceed to Stage 12 for Staff-level Career & Portfolio preparation."

        return {
            "roadmap_id": roadmap.id,
            "target_role": target_role or (user.profile.target_role if user.profile else "AI/ML Engineer"),
            "overall_progress": overall_roadmap_progress,
            "knowledge_score": knowledge_score,
            "completed_stages_count": completed_count,
            "active_stage": active_stage_title,
            "recommendation": recommendation,
            "steps": steps_out
        }

roadmap_engine = AdaptiveRoadmapEngine()
