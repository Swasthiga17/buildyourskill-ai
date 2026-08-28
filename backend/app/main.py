import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.middleware import SecurityAndObservabilityMiddleware
from app.db.session import init_db

# Import all API routers
from app.api.health import router as health_router
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
from app.api.feedback import router as feedback_router
from app.api.admin import router as admin_router
from app.api.beta import router as beta_router

logger = logging.getLogger("growskill.main")
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info(f"Starting {settings.PROJECT_NAME} (Environment: {settings.ENVIRONMENT})...")
    try:
        await init_db()
        logger.info("Database initialized and ready.")
    except Exception as e:
        logger.error(f"Error during DB initialization: {e}")
    yield
    logger.info(f"Shutting down {settings.PROJECT_NAME}.")

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Production-grade AI/ML Mentor, Dynamic Knowledge Twin & Adaptive Roadmap platform.",
    version=settings.VERSION,
    lifespan=lifespan,
    docs_url="/docs" if settings.ENVIRONMENT != "production" else None,
    redoc_url="/redoc" if settings.ENVIRONMENT != "production" else None
)

# 1. Observability & Security Headers Middleware
app.add_middleware(SecurityAndObservabilityMiddleware)

# 2. CORS Middleware with Strict Allowed Origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["X-Request-ID", "Retry-After"]
)

# 3. Register All API Routers
app.include_router(health_router)
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
app.include_router(feedback_router)
app.include_router(admin_router)
app.include_router(beta_router)

@app.get("/")
async def root():
    return {
        "product": settings.PROJECT_NAME,
        "tagline": "Real AI Intelligence Core & Adaptive Knowledge Twin",
        "status": "online",
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=False)
