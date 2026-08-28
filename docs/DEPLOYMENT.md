# Production Deployment Guide

**Product:** BuildYourSkill AI / GrowSkill AI  
**Deployment Architecture:** Simple, Secure Private-Beta Stack (FastAPI + React + Managed PostgreSQL `pgvector`)

---

## 1. Production Architecture Overview

```text
               Internet (Client Browser)
                          │
                          ▼ (HTTPS / TLS 1.3)
               ┌────────────────────────┐
               │  Cloudflare / Reverse  │ ──► SSL Termination & DDoS Shield
               │         Proxy          │
               └──────────┬─────────────┘
                          │
            ┌─────────────┴─────────────┐
            ▼                           ▼
 ┌─────────────────────┐     ┌─────────────────────┐
 │  Frontend (Vercel   │     │  Backend (Render /  │
 │    / Nginx CDN)     │     │   Railway / AWS)    │
 └─────────────────────┘     └──────────┬──────────┘
                                        │
                                        ▼ (Private Subnet / SSL)
                             ┌─────────────────────┐
                             │ Managed PostgreSQL  │
                             │    with pgvector    │
                             └─────────────────────┘
```

---

## 2. Environment Variables Configuration

Set these variables in your deployment dashboard (e.g. Render, Railway, Vercel):

### Backend Environment Variables
```ini
ENVIRONMENT=production
PROJECT_NAME="BuildYourSkill AI"
VERSION="1.0.0"

# Database Connection (Managed PostgreSQL with pgvector)
DATABASE_URL=postgresql+psycopg://user:password@db-host.internal:5432/growskill_prod?sslmode=require
DB_POOL_SIZE=15
DB_MAX_OVERFLOW=25
DB_POOL_TIMEOUT=30

# Security (Generate a random 64-char key)
SECRET_KEY=e8c9b3a7f1d2e4c6a8b0d2f4e6a8c0b2d4f6a8b0c2d4e6f8a0b2c4d6e8f0a2b4
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# LLM Keys
DEFAULT_LLM_PROVIDER=gemini
GEMINI_API_KEY=your_real_gemini_api_key_here
DEFAULT_LLM_MODEL=gemini-1.5-flash
STRICT_LLM_MODE=true

# CORS (Allowed production origins only)
BACKEND_CORS_ORIGINS=["https://app.buildyourskill.ai","https://buildyourskill.ai"]

# Rate Limiting
RATE_LIMIT_ENABLED=true
RATE_LIMIT_MENTOR_PER_HOUR=30
RATE_LIMIT_PROJECTS_PER_HOUR=10
RATE_LIMIT_INTERVIEW_PER_HOUR=20

# Private Beta
PRIVATE_BETA_MODE=false
```

### Frontend Environment Variables
```ini
VITE_API_BASE_URL=https://api.buildyourskill.ai
```

---

## 3. Deployment Steps

### Option A: Render / Railway Deployment
1. **Create Managed Database**:
   - Provision a PostgreSQL 16 database.
   - Run `CREATE EXTENSION IF NOT EXISTS vector;` in the query console.
2. **Deploy Backend Service**:
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT`
   - Add backend environment variables.
3. **Deploy Frontend on Vercel / Netlify**:
   - Root directory: `frontend`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Add `VITE_API_BASE_URL=https://api.buildyourskill.ai`

### Option B: Docker Compose (Single Host / VM)
```bash
# 1. Clone repository
git clone https://github.com/Swasthiga17/buildyourskill-ai.git
cd buildyourskill-ai

# 2. Configure production .env
cp .env.production.example .env
nano .env

# 3. Launch with Docker Compose
docker-compose -f docker-compose.production.yml up -d --build

# 4. Check service health
curl -f http://localhost:8000/health/ready
```

---

## 4. Verification & Health Monitoring

Verify all endpoints after deployment:
- **Liveness probe**: `GET /health/live` $\rightarrow$ `{"status": "alive"}`
- **Readiness probe**: `GET /health/ready` $\rightarrow$ `{"status": "ready", "database": "connected"}`
- **Swagger Documentation**: Disabled in production (`docs_url=None`) for security.
