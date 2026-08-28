from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import text
from app.db.session import get_db
from app.core.config import settings

router = APIRouter(tags=["health"])

@router.get("/health")
@router.get("/api/health")
async def health_check():
    """General health check returning service status, version, and environment."""
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT
    }

@router.get("/health/live")
@router.get("/api/health/live")
async def liveness_probe():
    """Liveness probe for container orchestrators (Kubernetes / ECS / Docker Compose). Returns 200 if process is running."""
    return {"status": "alive"}

@router.get("/health/ready")
@router.get("/api/health/ready")
async def readiness_probe(db: AsyncSession = Depends(get_db)):
    """Readiness probe checking database connectivity and critical service dependencies."""
    try:
        # Lightweight database ping without expensive queries
        await db.execute(text("SELECT 1"))
        return {
            "status": "ready",
            "database": "connected",
            "environment": settings.ENVIRONMENT
        }
    except Exception as e:
        return {
            "status": "unready",
            "database": "disconnected",
            "error": str(e)
        }
