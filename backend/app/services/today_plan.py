from typing import Dict, Any, List
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.learner_context import learner_context_service

class TodayPlanService:
    """Generates a personalized daily learning plan based on active skill gaps, recent mistakes, and roadmap focus."""

    async def get_today_plan(self, db: AsyncSession, user_id: int) -> Dict[str, Any]:
        context = await learner_context_service.get_learner_context(db, user_id)
        if not context:
            return {
                "date": "Today",
                "active_focus": "01 Python & Programming",
                "top_priority_gap": "Python",
                "estimated_time_minutes": 90,
                "expected_score_boost": "+3.0%",
                "learning_objective": "Master foundational concepts.",
                "tasks": []
            }

        top_gaps = context.get("top_gaps", [])
        top_gap_obj = top_gaps[0] if top_gaps else None
        gap_name = top_gap_obj["name"] if top_gap_obj else "Deep Learning & PyTorch"
        gap_code = top_gap_obj["skill_code"] if top_gap_obj else "pytorch"

        active_stage = context.get("roadmap", {}).get("active_step", "04 Deep Learning & PyTorch")

        # Dynamic task breakdown
        tasks = [
            {
                "id": 1,
                "title": f"Study Core Architectural Patterns in {gap_name}",
                "type": "Theory & Documentation",
                "duration": "25 mins",
                "status": "pending",
                "url": "/roadmap",
                "recommended_focus": f"Review computational graphs, tensors, and memory layout for {gap_name}."
            },
            {
                "id": 2,
                "title": f"Interactive {gap_name} Code Sandbox & Autograd Drill",
                "type": "Hands-on Implementation",
                "duration": "35 mins",
                "status": "pending",
                "url": "/projects",
                "recommended_focus": "Implement backward pass and gradient accumulation without runtime errors."
            },
            {
                "id": 3,
                "title": f"AI Mock Interview: Staff-Level {gap_name} Questions",
                "type": "AI Interview Simulation",
                "duration": "20 mins",
                "status": "pending",
                "url": "/interview",
                "recommended_focus": "Articulate design trade-offs and dynamic DAG construction clearly."
            },
            {
                "id": 4,
                "title": "Topic Mastery Knowledge Checkpoint",
                "type": "Diagnostic Quiz",
                "duration": "10 mins",
                "status": "pending",
                "url": "/roadmap",
                "recommended_focus": f"Validate {gap_name} conceptual recall and close the {top_gap_obj['gap'] if top_gap_obj else 30}% gap."
            }
        ]

        return {
            "date": "Today",
            "active_focus": active_stage,
            "top_priority_gap": gap_name,
            "estimated_time_minutes": 90,
            "expected_score_boost": "+4.5%",
            "learning_objective": f"Close your {gap_name} skill gap by advancing through stage {active_stage}, passing the coding sandbox challenge, and logging interview evidence.",
            "tasks": tasks
        }

today_plan_service = TodayPlanService()
