from typing import List, Dict, Any, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from app.db.models import User, UserProfile, Skill, UserSkill, RoleBenchmark

class SkillGapEngine:
    """Computes dynamic multi-factor skill gaps relative to target career role benchmarks."""

    async def calculate_gaps(self, db: AsyncSession, user_id: int, target_role: Optional[str] = None) -> Dict[str, Any]:
        # Fetch user with profile and skills
        res = await db.execute(
            select(User)
            .options(
                selectinload(User.profile),
                selectinload(User.skills).selectinload(UserSkill.skill)
            )
            .where(User.id == user_id)
        )
        user = res.scalar_one_or_none()
        if not user:
            return None

        role_name = target_role or (user.profile.target_role if user.profile else "AI/ML Engineer")

        # Fetch Role Benchmark
        res_bm = await db.execute(select(RoleBenchmark).where(RoleBenchmark.role_name == role_name))
        benchmark = res_bm.scalar_one_or_none()
        
        # Fallback default benchmark if not present in DB
        if not benchmark:
            res_bm_any = await db.execute(select(RoleBenchmark))
            benchmark = res_bm_any.scalars().first()

        req_skills: Dict[str, float] = benchmark.required_skills if benchmark else {}
        weights: Dict[str, float] = benchmark.importance_weights if benchmark else {}

        user_skills_map = {us.skill.code: us for us in user.skills}

        # Fetch all available skills to ensure complete mapping
        res_all = await db.execute(select(Skill))
        all_skills = res_all.scalars().all()

        gap_items = []
        total_weighted_match = 0.0
        total_weight_sum = 0.0

        for skill in all_skills:
            code = skill.code
            req_score = req_skills.get(code, 75.0)
            weight = weights.get(code, 1.0)
            
            us = user_skills_map.get(code)
            current_score = us.current_score if us else 0.0
            confidence = us.confidence if us else 0.5

            raw_gap = max(0.0, req_score - current_score)

            # Multi-factor priority formula:
            # priority_score = raw_gap * importance_weight * (1.2 - confidence * 0.2)
            priority_score = raw_gap * weight * (1.2 - confidence * 0.2)

            if raw_gap >= 30.0 or priority_score >= 40.0:
                priority = "critical"
                is_critical = True
                action = f"Immediate Focus: Master core {skill.name} modules and complete diagnostic project."
                est_hours = int(raw_gap * 0.6)
            elif raw_gap >= 18.0:
                priority = "high"
                is_critical = False
                action = f"High Priority: Reinforce practical applications in {skill.name}."
                est_hours = int(raw_gap * 0.5)
            elif raw_gap >= 8.0:
                priority = "medium"
                is_critical = False
                action = f"Refine knowledge: Complete advanced {skill.name} challenges."
                est_hours = int(raw_gap * 0.4)
            else:
                priority = "low"
                is_critical = False
                action = f"Maintained Mastery: Keep {skill.name} updated via weekly reviews."
                est_hours = 2

            gap_items.append({
                "skill_code": code,
                "name": skill.name,
                "category": skill.category,
                "current_score": round(current_score, 1),
                "required_score": round(req_score, 1),
                "gap": round(raw_gap, 1),
                "priority": priority,
                "importance_weight": weight,
                "confidence": round(confidence, 2),
                "is_critical": is_critical,
                "recommended_action": action,
                "estimated_hours_to_close": max(2, est_hours),
                "_priority_score": priority_score
            })

            # Calculate weighted benchmark match
            match_ratio = min(1.0, current_score / max(1.0, req_score))
            total_weighted_match += match_ratio * weight
            total_weight_sum += weight

        # Sort gaps by priority score descending
        gap_items.sort(key=lambda x: x["_priority_score"], reverse=True)
        for item in gap_items:
            item.pop("_priority_score", None)

        benchmark_match = round((total_weighted_match / max(1.0, total_weight_sum)) * 100.0, 1)
        critical_count = sum(1 for g in gap_items if g["is_critical"])

        return {
            "target_role": role_name,
            "overall_readiness": user.profile.readiness_score if user.profile else 68.0,
            "total_gaps": len([g for g in gap_items if g["gap"] > 0]),
            "critical_gaps_count": critical_count,
            "priority_gaps": gap_items,
            "industry_benchmark_match": benchmark_match
        }

skill_gap_engine = SkillGapEngine()
