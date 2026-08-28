import os
import json
import logging
from typing import List, Union
from pydantic_settings import BaseSettings
from pydantic import field_validator

logger = logging.getLogger("growskill.config")

class Settings(BaseSettings):
    PROJECT_NAME: str = "BuildYourSkill AI / GrowSkill AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development").lower()
    
    # Security / Auth
    SECRET_KEY: str = os.getenv("SECRET_KEY", "growskill-ai-super-secret-jwt-key-2026-secure-token")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "sqlite+aiosqlite:///./growskill.db"
    )
    DB_POOL_SIZE: int = int(os.getenv("DB_POOL_SIZE", "10"))
    DB_MAX_OVERFLOW: int = int(os.getenv("DB_MAX_OVERFLOW", "20"))
    DB_POOL_TIMEOUT: int = int(os.getenv("DB_POOL_TIMEOUT", "30"))
    
    # LLM Settings (Google Gemini or OpenAI)
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    DEFAULT_LLM_PROVIDER: str = os.getenv("DEFAULT_LLM_PROVIDER", "gemini") # "gemini" or "openai"
    DEFAULT_LLM_MODEL: str = os.getenv("DEFAULT_LLM_MODEL", "gemini-2.5-flash")
    STRICT_LLM_MODE: bool = os.getenv("STRICT_LLM_MODE", "false").lower() in ("true", "1")

    # Coding Execution Sandbox Limits
    SANDBOX_TIMEOUT_SECONDS: int = int(os.getenv("SANDBOX_TIMEOUT_SECONDS", "5"))
    SANDBOX_MAX_MEMORY_MB: int = int(os.getenv("SANDBOX_MAX_MEMORY_MB", "256"))
    SANDBOX_MAX_OUTPUT_CHARS: int = 10000

    # Rate Limiting Controls
    RATE_LIMIT_ENABLED: bool = os.getenv("RATE_LIMIT_ENABLED", "true" if os.getenv("ENVIRONMENT") == "production" else "false").lower() in ("true", "1")
    RATE_LIMIT_MENTOR_PER_HOUR: int = int(os.getenv("RATE_LIMIT_MENTOR_PER_HOUR", "30"))
    RATE_LIMIT_PROJECTS_PER_HOUR: int = int(os.getenv("RATE_LIMIT_PROJECTS_PER_HOUR", "10"))
    RATE_LIMIT_INTERVIEW_PER_HOUR: int = int(os.getenv("RATE_LIMIT_INTERVIEW_PER_HOUR", "20"))
    
    # Private Beta Gate
    PRIVATE_BETA_MODE: bool = os.getenv("PRIVATE_BETA_MODE", "false").lower() in ("true", "1")
    BETA_ACCESS_CODE: str = os.getenv("BETA_ACCESS_CODE", "")

    # CORS
    BACKEND_CORS_ORIGINS: Union[List[str], str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:8000",
        "https://app.buildyourskill.ai",
        "https://buildyourskill.ai"
    ]

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",") if i.strip()]
        elif isinstance(v, str):
            try:
                return json.loads(v)
            except Exception:
                return [v]
        return v

    def validate_production_readiness(self):
        """Enforces critical security assertions when running in production."""
        if self.ENVIRONMENT == "production":
            if "growskill-ai-super-secret-jwt-key" in self.SECRET_KEY:
                raise ValueError("CRITICAL SECURITY ERROR: Default SECRET_KEY detected in PRODUCTION mode. Configure a secure 64+ char random secret.")
            if "sqlite" in self.DATABASE_URL.lower():
                raise ValueError("CRITICAL DATABASE ERROR: SQLite detected in PRODUCTION mode. Managed PostgreSQL with pgvector is required.")
            logger.info("✓ Production security assertions verified.")

    model_config = {
        "env_file": ".env",
        "case_sensitive": True,
        "extra": "ignore"
    }

settings = Settings()
settings.validate_production_readiness()
