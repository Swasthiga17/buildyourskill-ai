from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Dict, Any, Optional
from app.db.session import get_db
from app.db.models import User, Project
from app.core.security import get_current_user
from app.services.llm import llm_service
from app.services.knowledge_twin import knowledge_twin_service
from app.services.skill_gap import skill_gap_engine
from app.schemas.schemas import ProjectGenerateRequest, ProjectOut

router = APIRouter(prefix="/api/projects", tags=["projects"])

@router.post("/generate", response_model=ProjectOut)
async def generate_project_blueprint(
    req: ProjectGenerateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    twin = await knowledge_twin_service.get_user_twin(db, current_user.id)
    gaps_data = await skill_gap_engine.calculate_gaps(db, current_user.id)

    top_gaps = [g["name"] for g in gaps_data.get("priority_gaps", [])[:2]]
    target_role = req.target_role or twin.get("target_role", "AI/ML Engineer")

    prompt = f"""Generate a comprehensive, production-grade AI portfolio project blueprint designed specifically to close the learner's skill gaps: {top_gaps}.
Target Role: {target_role}
Learner Goal / Focus: {req.goal or 'Build a scalable end-to-end AI system'}
Difficulty Level: {req.difficulty}

Respond in strict JSON with the following structure:
{{
  "title": "string",
  "category": "string",
  "difficulty": "string",
  "problem_statement": "string",
  "objective": "string",
  "architecture": "string",
  "tech_stack": ["string", "string"],
  "milestones": [
    {{"phase": "string", "desc": "string"}},
    {{"phase": "string", "desc": "string"}}
  ],
  "starter_code": "string",
  "evaluation_criteria": ["string", "string"],
  "interview_talking_points": ["string", "string"]
}}"""

    system_prompt = "You are a Principal AI Systems Architect and Engineering Director creating career-defining portfolio project blueprints."
    
    project_json = await llm_service.generate_json(prompt, system_prompt)

    # Fallback safe fields
    title = project_json.get("title", "Enterprise Hybrid RAG Search Engine")
    category = project_json.get("category", "Generative AI & LLMs")
    difficulty = project_json.get("difficulty", req.difficulty or "Advanced")
    problem = project_json.get("problem_statement", "Enterprises struggle with low-accuracy LLM hallucinations when searching across internal repositories.")
    objective = project_json.get("objective", "Build a sub-50ms hybrid vector search engine with reranking and memory.")
    architecture = project_json.get("architecture", "FastAPI + Qdrant / pgvector + LangChain + Docker")
    tech_stack = project_json.get("tech_stack", ["FastAPI", "PostgreSQL (pgvector)", "PyTorch", "LangChain", "Docker"])
    milestones = project_json.get("milestones", [
        {"phase": "1. Ingestion & Chunking", "desc": "Implement semantic chunking for multi-format text."},
        {"phase": "2. Vector Indexing", "desc": "Generate embeddings with sentence-transformers and store in pgvector."},
        {"phase": "3. Query Engine", "desc": "Combine BM25 keyword search with dense vector similarity."},
        {"phase": "4. Production Serving", "desc": "Deploy via Docker with async endpoints and Prometheus metrics."}
    ])
    starter_code = project_json.get("starter_code", "from sentence_transformers import SentenceTransformer\n\nmodel = SentenceTransformer('all-MiniLM-L6-v2')\nembedding = model.encode('Machine learning vectors')\nprint('Vector Preview:', embedding[:5])")
    eval_criteria = project_json.get("evaluation_criteria", ["<50ms latency", ">90% top-3 retrieval recall"])
    interview_points = project_json.get("interview_talking_points", ["Trade-offs between HNSW and IVFFlat indexes", "Context compression techniques"])

    project = Project(
        user_id=current_user.id,
        title=title,
        category=category,
        difficulty=difficulty,
        target_role=target_role,
        problem_statement=problem,
        objective=objective,
        architecture=architecture,
        tech_stack=tech_stack,
        milestones=milestones,
        starter_code=starter_code,
        evaluation_criteria=eval_criteria,
        interview_talking_points=interview_points,
        status="active"
    )
    db.add(project)
    await db.commit()

    return ProjectOut(
        id=project.id,
        title=project.title,
        category=project.category,
        difficulty=project.difficulty,
        target_role=project.target_role,
        problem_statement=project.problem_statement,
        objective=project.objective,
        architecture=project.architecture,
        tech_stack=project.tech_stack,
        milestones=project.milestones,
        starter_code=project.starter_code,
        evaluation_criteria=project.evaluation_criteria,
        interview_talking_points=project.interview_talking_points,
        created_at=project.created_at
    )

@router.post("/{project_id}/complete")
async def complete_project(
    project_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    from app.services.evidence import evidence_engine

    res = await db.execute(
        select(Project).where(Project.id == project_id, Project.user_id == current_user.id)
    )
    project = res.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    project.status = "completed"
    await db.flush()

    # Map tech stack / category to skill code
    skill_code = "rag"
    if "pytorch" in str(project.tech_stack).lower():
        skill_code = "pytorch"
    elif "langchain" in str(project.tech_stack).lower() or "llm" in project.category.lower():
        skill_code = "llm"
    elif "agent" in project.title.lower() or "agent" in project.category.lower():
        skill_code = "agents"

    evidence_res = await evidence_engine.record_learning_evidence(
        db=db,
        user_id=current_user.id,
        skill_code=skill_code,
        source_type="project",
        source_id=str(project.id),
        title=f"Completed Portfolio Project: {project.title}",
        detail=f"Built and validated end-to-end architecture with milestones: {project.objective}",
        score=92.0,
        confidence="high",
        metadata={"project_id": project.id, "tech_stack": project.tech_stack}
    )

    return {
        "status": "success",
        "project_id": project.id,
        "evidence": evidence_res
    }

@router.get("/saved", response_model=List[ProjectOut])
async def get_saved_projects(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(
        select(Project).where(Project.user_id == current_user.id).order_by(Project.created_at.desc())
    )
    projects = res.scalars().all()
    return [
        ProjectOut(
            id=p.id,
            title=p.title,
            category=p.category,
            difficulty=p.difficulty,
            target_role=p.target_role,
            problem_statement=p.problem_statement,
            objective=p.objective,
            architecture=p.architecture,
            tech_stack=p.tech_stack,
            milestones=p.milestones,
            starter_code=p.starter_code,
            evaluation_criteria=p.evaluation_criteria,
            interview_talking_points=p.interview_talking_points,
            created_at=p.created_at
        )
        for p in projects
    ]
