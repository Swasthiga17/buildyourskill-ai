import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.session import init_db

# Import all API routers
from app.api.auth import router as auth_router
from app.api.knowledge_twin import router as knowledge_twin_router
from app.api.skill_gap import router as skill_gap_router
from app.api.roadmap import router as roadmap_router
from app.api.mentor import router as mentor_router
from app.api.projects import router as projects_router
from app.api.interview import router as interview_router
from app.api.assessments import router as assessments_router
from app.api.knowledge import router as knowledge_router
from app.api.github import router as github_router
from app.api.today_plan import router as today_plan_router

logger = logging.getLogger("growskill.main")
logging.basicConfig(level=logging.INFO)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize DB and seed curriculum
    logger.info("Initializing database tables and seeding baseline AI curriculum...")
    try:
        await init_db()
        logger.info("Database initialized and ready.")
    except Exception as e:
        logger.error(f"Error during DB initialization: {e}")
    yield
    # Shutdown
    logger.info("Shutting down GrowSkill AI backend.")

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Production-grade AI/ML Mentor, Dynamic Knowledge Twin & Adaptive Roadmap platform.",
    version=settings.VERSION,
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register all API endpoints
app.include_router(auth_router)
app.include_router(knowledge_twin_router)
app.include_router(skill_gap_router)
app.include_router(roadmap_router)
app.include_router(mentor_router)
app.include_router(projects_router)
app.include_router(interview_router)
app.include_router(assessments_router)
app.include_router(knowledge_router)
app.include_router(github_router)
app.include_router(today_plan_router)

@app.get("/")
async def root():
    return {
        "product": "GrowSkill AI",
        "tagline": "Real AI Intelligence Core & Adaptive Knowledge Twin",
        "status": "online",
        "version": settings.VERSION,
        "database": "PostgreSQL / SQLite with SQLAlchemy 2.0 Async",
        "ai_engine": "Google Gemini / OpenAI LLM + pgvector RAG"
    }

@app.get("/api/health")
async def health():
    return {"status": "healthy", "service": "GrowSkill AI Core"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
