# GrowSkill AI — Production Deployment Guide

A step-by-step production runbook to bundle, containerize, and deploy the **GrowSkill AI** (`buildyourskill-ai`) full-stack platform for real-world usage.

---

## 1. Production Architecture Overview

```mermaid
graph TD
    User([End User Browser]) -->|HTTPS / Port 443| Nginx[Nginx Reverse Proxy & Static Server]
    
    subgraph Docker Production Network (internal-net)
        Nginx -->|Static Assets / SPA Fallback| FrontendFiles[React + Vite Production Bundle]
        Nginx -->|/api/* Proxy Pass| FastAPI[FastAPI Async Backend :8000]
        
        FastAPI -->|Async Connection Pool| PG[(PostgreSQL 16 + pgvector :5432)]
        FastAPI -->|HTTPS API Requests| Gemini[Google Gemini AI Engine]
    end
    
    subgraph Persistent Storage
        PG --- PGVolume[(growskill_pgdata Volume)]
    end
```

### Components & Roles
1. **Nginx Container (`frontend`):**
   - Serves pre-compiled, gzipped static React assets.
   - Enforces SPA routing (`try_files $uri $uri/ /index.html;`) so direct links to `/roadmap`, `/dashboard`, etc. never 404.
   - Injects HTTP security headers (`X-Frame-Options`, `X-Content-Type-Options`).
   - Reverse-proxies `/api/` traffic directly to the backend container over Docker's internal bridge network.
2. **FastAPI Backend Container (`backend`):**
   - Runs asynchronous endpoints with connection pooling and rate limiting.
   - Executes live database initialization (`init_db`) on startup.
   - Liveness (`/api/health/live`) and readiness (`/api/health/ready`) probes.
3. **PostgreSQL 16 + pgvector Container (`postgres`):**
   - Native HNSW and IVFFlat vector indexing for RAG document embeddings and Knowledge Twin similarity queries.
   - Isolated from the public internet (accessible only by the backend container).

---

## 2. Quick-Start Deployment (Single Command)

### On Linux / macOS / Cloud VPS:
```bash
chmod +x scripts/deploy_production.sh
./scripts/deploy_production.sh
```

### On Windows (PowerShell):
```powershell
.\scripts\deploy_production.ps1
```

The script will automatically:
1. Verify system dependencies (Docker, Compose).
2. Generate secure `.env.production` secrets if missing.
3. Build the production Docker containers with multi-stage caching.
4. Launch the stack in detached daemon mode.
5. Poll `/api/health/live` until all containers report healthy.

---

## 3. Manual Step-by-Step Production Deployment

### Step 1: Configure Production Environment Variables

Copy the template and edit production credentials:
```bash
cp .env.production.example .env.production
```

Configure the following critical variables:
```ini
ENVIRONMENT=production
PROJECT_NAME="GrowSkill AI"

# Cryptographic Secret (64 characters)
SECRET_KEY=generate_with_python_secrets_token_urlsafe

# Managed Database URL
DATABASE_URL=postgresql+psycopg://growskill_admin:YOUR_STRONG_PASSWORD@postgres:5432/growskill_prod

# Google Gemini API Key
DEFAULT_LLM_PROVIDER=gemini
GEMINI_API_KEY=AIzaSy...your_gemini_api_key...
DEFAULT_LLM_MODEL=gemini-1.5-flash
STRICT_LLM_MODE=true

# Allowed CORS origins
BACKEND_CORS_ORIGINS=["https://app.yourdomain.com","http://localhost"]
```

### Step 2: Build & Launch with Docker Compose
```bash
docker compose --env-file .env.production -f docker-compose.production.yml build --no-cache
docker compose --env-file .env.production -f docker-compose.production.yml up -d
```

### Step 3: Verify Container Health
```bash
# Check running status
docker compose -f docker-compose.production.yml ps

# Test live probe
curl -f http://localhost:8000/api/health/live
# Expected: {"status":"alive"}

# Test readiness probe (verifies database connectivity)
curl -f http://localhost:8000/api/health/ready
# Expected: {"status":"ready","database":"connected","environment":"production"}
```

---

## 4. Setting Up Free SSL / HTTPS (Let's Encrypt & Certbot)

For a public server (e.g. Ubuntu VPS on DigitalOcean, AWS, Linode), configure Certbot for automatic SSL renewal:

1. Install Certbot:
   ```bash
   sudo apt-get update && sudo apt-get install -y certbot
   ```
2. Obtain Certificate in standalone mode:
   ```bash
   sudo certbot certonly --standalone -d app.yourdomain.com
   ```
3. Mount certificates in `docker-compose.production.yml`:
   ```yaml
   frontend:
     volumes:
       - /etc/letsencrypt:/etc/letsencrypt:ro
     ports:
       - "80:80"
       - "443:443"
   ```

---

## 5. Alternative Cloud Deployments (PaaS)

### Render / Railway / Fly.io

1. **Database:** Deploy a managed PostgreSQL instance with the `vector` extension enabled.
2. **Backend Web Service:**
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Health Check Path: `/api/health/live`
3. **Frontend Static Site:**
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - Environment Variable: `VITE_API_BASE_URL=https://your-backend-url.onrender.com`

---

## 6. Maintenance & Operations Runbook

### Viewing Live Logs
```bash
# Follow backend logs
docker compose -f docker-compose.production.yml logs -f backend

# Follow frontend Nginx access/error logs
docker compose -f docker-compose.production.yml logs -f frontend
```

### Database Backups
```bash
# Create timestamped database backup
docker compose -f docker-compose.production.yml exec postgres pg_dump -U growskill_admin growskill_prod > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore from backup
cat backup_file.sql | docker compose -f docker-compose.production.yml exec -T postgres psql -U growskill_admin -d growskill_prod
```

### Zero-Downtime Application Updates
```bash
git pull origin main
docker compose --env-file .env.production -f docker-compose.production.yml build
docker compose --env-file .env.production -f docker-compose.production.yml up -d --no-deps backend frontend
```
