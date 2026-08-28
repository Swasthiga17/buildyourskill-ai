from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Dict, Any
from app.db.session import get_db
from app.db.models import User
from app.core.security import get_current_user
from app.integrations.github import github_auditor
from app.services.knowledge_twin import knowledge_twin_service

router = APIRouter(prefix="/api/github", tags=["github"])

@router.post("/analyze")
async def analyze_github_repo(
    req: Dict[str, Any],
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    repo_url = req.get("repo_url", "alex-rivera/production-rag-serving")
    audit_res = await github_auditor.audit_repository(repo_url)

    # Record verified skill evidence in Knowledge Twin
    for vs in audit_res.get("verifiedSkills", []):
        skill_code = vs.get("skill_code", "python")
        await knowledge_twin_service.record_evidence(
            db=db,
            user_id=current_user.id,
            skill_code=skill_code,
            evidence_type="github",
            title=f"GitHub Repo Audit: {audit_res['repoName']}",
            detail=f"Verified proficiency in {vs['name']} ({vs['boost']}).",
            score=88.0,
            confidence="high"
        )

    twin = await knowledge_twin_service.get_user_twin(db, current_user.id)
    audit_res["updated_knowledge_score"] = twin["knowledge_score"]
    return audit_res
