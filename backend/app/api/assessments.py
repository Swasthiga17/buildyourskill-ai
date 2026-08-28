from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Dict, Any, Optional
from app.db.session import get_db
from app.db.models import User, AssessmentSubmission
from app.core.security import get_current_user
from app.services.sandbox import sandbox_service
from app.services.knowledge_twin import knowledge_twin_service
from app.schemas.schemas import CodeRunRequest, CodeRunResponse

router = APIRouter(prefix="/api/assessments", tags=["assessments"])

@router.post("/run-code", response_model=CodeRunResponse)
async def run_code(
    req: CodeRunRequest,
    current_user: User = Depends(get_current_user)
):
    result = await sandbox_service.execute_code(req.code, req.test_cases)
    return CodeRunResponse(
        status=result["status"],
        output=result["output"],
        passed=result["passed"],
        failed=result["failed"],
        total=result["total"],
        execution_time_ms=result["execution_time_ms"],
        memory_used_kb=result["memory_used_kb"]
    )

@router.post("/submit")
async def submit_assessment(
    req: Dict[str, Any],
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    stage_id = str(req.get("stage_id", "01"))
    skill_code = str(req.get("skill_code", "python"))
    score = float(req.get("score", 90.0))
    title = str(req.get("title", f"Stage {stage_id} Assessment"))

    submission = AssessmentSubmission(
        user_id=current_user.id,
        stage_id=stage_id,
        submitted_answer=str(req.get("code", "")),
        score=score,
        depth_score=score,
        accuracy_score=score,
        clarity_score=score,
        feedback=f"Completed {title} with score {score}%",
        test_results=req.get("test_results", [])
    )
    db.add(submission)
    await db.flush()

    # Update Knowledge Twin
    await knowledge_twin_service.record_evidence(
        db=db,
        user_id=current_user.id,
        skill_code=skill_code,
        evidence_type="assessment",
        title=title,
        detail=f"Scored {score}% on coding and concept checkpoint.",
        score=score,
        confidence="high"
    )

    from app.services.telemetry import telemetry_service
    await telemetry_service.track_event(
        db=db,
        user_id=current_user.id,
        event_name="assessment_completed",
        properties={"skill_code": skill_code, "score": score, "stage_id": stage_id}
    )

    twin = await knowledge_twin_service.get_user_twin(db, current_user.id)
    return {
        "status": "success",
        "score": score,
        "new_knowledge_score": twin["knowledge_score"]
    }
