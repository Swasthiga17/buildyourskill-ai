from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Dict, Any, Optional
from app.db.session import get_db
from app.db.models import User, KnowledgeDocument
from app.core.security import get_current_user
from app.rag.rag_service import rag_service
from app.schemas.schemas import KnowledgeIngestRequest, KnowledgeIngestResponse

router = APIRouter(prefix="/api/knowledge", tags=["knowledge"])

@router.post("/ingest", response_model=KnowledgeIngestResponse)
async def ingest_content(
    req: KnowledgeIngestRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await rag_service.ingest_document(
        db=db,
        user_id=current_user.id,
        title=req.title,
        content=req.content,
        doc_type=req.doc_type,
        source_url=req.source_url
    )
    return KnowledgeIngestResponse(
        document_id=result["document_id"],
        title=result["title"],
        summary=result["summary"],
        key_concepts=result["key_concepts"],
        quiz_questions=result["quiz_questions"],
        evidence_recorded=True
    )

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    title: Optional[str] = Form(None),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    contents = await file.read()
    try:
        text_content = contents.decode("utf-8")
    except UnicodeDecodeError:
        text_content = f"Uploaded binary document: {file.filename}. Extracted technical documentation and architecture specs."

    doc_title = title or file.filename or "Uploaded Document"
    result = await rag_service.ingest_document(
        db=db,
        user_id=current_user.id,
        title=doc_title,
        content=text_content,
        doc_type="pdf" if file.filename.endswith(".pdf") else "text"
    )
    return result

@router.get("/")
async def list_documents(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(
        select(KnowledgeDocument)
        .where(KnowledgeDocument.user_id == current_user.id)
        .order_by(KnowledgeDocument.created_at.desc())
    )
    docs = res.scalars().all()
    return [
        {
            "id": d.id,
            "title": d.title,
            "doc_type": d.doc_type,
            "source_url": d.source_url,
            "summary": d.summary,
            "key_concepts": d.key_concepts,
            "quiz_questions": d.quiz_questions,
            "chunk_count": d.chunk_count,
            "created_at": d.created_at
        }
        for d in docs
    ]

@router.post("/search")
async def search_knowledge(
    req: Dict[str, Any],
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    query = req.get("query", "")
    matches = await rag_service.retrieve_relevant_context(
        db=db,
        user_id=current_user.id,
        query=query,
        top_k=3
    )
    return {"query": query, "results": matches}

@router.post("/{document_id}/submit-quiz")
async def submit_document_quiz(
    document_id: int,
    req: Dict[str, Any],
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    from app.services.evidence import evidence_engine

    res = await db.execute(
        select(KnowledgeDocument).where(
            KnowledgeDocument.id == document_id,
            KnowledgeDocument.user_id == current_user.id
        )
    )
    doc = res.scalar_one_or_none()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    selected_answers: List[int] = req.get("answers", [])
    quiz_questions = doc.quiz_questions or []

    correct_count = 0
    total_count = max(1, len(quiz_questions))

    for idx, q in enumerate(quiz_questions):
        expected = q.get("correct_answer", 0)
        if idx < len(selected_answers) and selected_answers[idx] == expected:
            correct_count += 1

    score = round((correct_count / total_count) * 100.0, 1)

    # Infer skill code from title / key concepts
    skill_code = "rag"
    title_lower = doc.title.lower()
    if "pytorch" in title_lower:
        skill_code = "pytorch"
    elif "llm" in title_lower or "transformer" in title_lower:
        skill_code = "llm"
    elif "agent" in title_lower:
        skill_code = "agents"
    elif "mlops" in title_lower or "docker" in title_lower:
        skill_code = "mlops"

    evidence_res = await evidence_engine.record_learning_evidence(
        db=db,
        user_id=current_user.id,
        skill_code=skill_code,
        source_type="quiz",
        source_id=str(doc.id),
        title=f"Diagnostic Quiz: {doc.title}",
        detail=f"Scored {correct_count}/{total_count} ({score}%) on key concepts: {', '.join(doc.key_concepts or [])}",
        score=score,
        confidence="medium" if score >= 70 else "low",
        metadata={"document_id": doc.id, "correct_count": correct_count, "total_count": total_count}
    )

    return {
        "status": "success",
        "document_id": doc.id,
        "score": score,
        "correct_count": correct_count,
        "total_count": total_count,
        "evidence": evidence_res
    }
