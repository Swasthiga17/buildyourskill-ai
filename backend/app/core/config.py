import os
from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "GrowSkill AI / BuildYourSkill AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    # Security / Auth
    SECRET_KEY: str = os.getenv("SECRET_KEY", "growskill-ai-super-secret-jwt-key-2026-secure-token")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Database
    # Defaults to async SQLite for instant local operation, or PostgreSQL if specified
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "sqlite+aiosqlite:///./growskill.db"
    )
    
    # LLM Settings (Google Gemini or OpenAI)
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    DEFAULT_LLM_PROVIDER: str = os.getenv("DEFAULT_LLM_PROVIDER", "gemini") # "gemini" or "openai"
    DEFAULT_LLM_MODEL: str = os.getenv("DEFAULT_LLM_MODEL", "gemini-1.5-flash")
    STRICT_LLM_MODE: bool = os.getenv("STRICT_LLM_MODE", "false").lower() in ("true", "1")

    # Coding Execution Sandbox Limits
    SANDBOX_TIMEOUT_SECONDS: int = 5
    SANDBOX_MAX_MEMORY_MB: int = 256
    SANDBOX_MAX_OUTPUT_CHARS: int = 10000
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:8000",
        "*"
    ]

    model_config = {
        "env_file": ".env",
        "case_sensitive": True,
        "extra": "ignore"
    }

settings = Settings()
