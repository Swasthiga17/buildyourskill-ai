from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Dict, Any
from app.db.session import get_db
from app.db.models import User, InterviewResult
from app.core.security import get_current_user
from app.services.llm import llm_service
from app.services.knowledge_twin import knowledge_twin_service
from app.schemas.schemas import InterviewEvaluateRequest, InterviewEvaluationResponse

router = APIRouter(prefix="/api/interview", tags=["interview"])

@router.post("/evaluate", response_model=InterviewEvaluationResponse)
async def evaluate_interview_response(
    req: InterviewEvaluateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    system_prompt = "You are a Staff AI/ML Engineering Interviewer evaluating a candidate's response."
    prompt = f"""Evaluate the candidate's interview answer.
Question: {req.question_title}
Category: {req.category}
Expected Concepts/Keywords: {req.expected_keywords or []}
Candidate Answer: {req.user_answer}

Respond in strict JSON with:
{{
  "overall_score": float (0-100),
  "depth_score": float (0-100),
  "accuracy_score": float (0-100),
  "clarity_score": float (0-100),
  "feedback": "string",
  "missing_concepts": ["string"],
  "strengths": ["string"]
}}"""

    evaluation = await llm_service.generate_json(prompt, system_prompt)

    overall_score = float(evaluation.get("overall_score", 85.0))
    depth_score = float(evaluation.get("depth_score", 88.0))
    accuracy_score = float(evaluation.get("accuracy_score", 86.0))
    clarity_score = float(evaluation.get("clarity_score", 82.0))
    feedback = str(evaluation.get("feedback", "Excellent technical explanation of core principles."))
    missing_concepts = evaluation.get("missing_concepts", ["GPU memory optimization"])
    strengths = evaluation.get("strengths", ["Accurate DAG breakdown", "Precise terminology"])

    # 1. Save Interview Result
    interview_record = InterviewResult(
        user_id=current_user.id,
        question_title=req.question_title,
        category=req.category,
        user_answer=req.user_answer,
        overall_score=overall_score,
        depth_score=depth_score,
        accuracy_score=accuracy_score,
        clarity_score=clarity_score,
        feedback_text=feedback,
        missing_concepts=missing_concepts,
        strengths=strengths
    )
    db.add(interview_record)
    await db.flush()

    # 2. FEEDBACK LOOP: Update Knowledge Twin evidence
    category_to_skill = {
        "deep learning engineering": "pytorch",
        "rag & vector databases": "rag",
        "machine learning": "ml",
        "generative ai": "transformers",
        "mlops": "mlops",
        "system design": "system_design"
    }
    skill_code = category_to_skill.get(req.category.lower(), "pytorch")

    await knowledge_twin_service.record_evidence(
        db=db,
        user_id=current_user.id,
        skill_code=skill_code,
        evidence_type="interview",
        title=f"Mock Interview: {req.question_title}",
        detail=f"Scored {int(overall_score)}% (Depth: {int(depth_score)}%, Accuracy: {int(accuracy_score)}%). Feedback: {feedback[:100]}...",
        score=overall_score,
        confidence="high"
    )

    twin = await knowledge_twin_service.get_user_twin(db, current_user.id)

    return InterviewEvaluationResponse(
        overall_score=overall_score,
        depth_score=depth_score,
        accuracy_score=accuracy_score,
        clarity_score=clarity_score,
        feedback=feedback,
        missing_concepts=missing_concepts,
        strengths=strengths,
        updated_knowledge_score=twin["knowledge_score"]
    )
