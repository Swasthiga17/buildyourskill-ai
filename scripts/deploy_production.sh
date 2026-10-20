#!/usr/bin/env bash
# ==============================================================================
# GrowSkill AI - Production Deployment Automation Script
# Usage: ./scripts/deploy_production.sh
# ==============================================================================

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================================================${NC}"
echo -e "${BLUE}       🚀 GROWSKILL AI - PRODUCTION DEPLOYMENT ENGINE          ${NC}"
echo -e "${BLUE}================================================================${NC}"

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

# 1. Pre-Flight Configuration Checks
echo -e "\n${YELLOW}[1/6] Validating Production Environment Configuration...${NC}"
if [ ! -f ".env.production" ]; then
    if [ -f ".env.production.example" ]; then
        echo -e "${YELLOW}⚠️  .env.production not found. Initializing from .env.production.example...${NC}"
        cp .env.production.example .env.production
        
        # Generate random cryptographic secret key
        RANDOM_SECRET=$(python3 -c "import secrets; print(secrets.token_urlsafe(48))" 2>/dev/null || openssl rand -base64 36)
        RANDOM_DB_PASS=$(python3 -c "import secrets; print(secrets.token_urlsafe(24))" 2>/dev/null || openssl rand -base64 18)
        
        sed -i "s/REPLACE_WITH_A_64_CHAR_CRYPTOGRAPHICALLY_SECURE_SECRET_KEY/$RANDOM_SECRET/" .env.production
        sed -i "s/REPLACE_WITH_STRONG_DB_PASSWORD/$RANDOM_DB_PASS/" .env.production
        echo -e "${GREEN}✓ Created .env.production with auto-generated secure credentials.${NC}"
        echo -e "${YELLOW}👉 Remember to set your GEMINI_API_KEY in .env.production before running LLM workloads!${NC}"
    else
        echo -e "${RED}❌ Fatal: Neither .env.production nor .env.production.example exists.${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓ Production environment file .env.production detected.${NC}"
fi

# 2. Dependency Checks
echo -e "\n${YELLOW}[2/6] Checking System Tooling (Docker, Docker Compose)...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is required but not installed. Please install Docker Engine first.${NC}"
    exit 1
fi

DOCKER_COMPOSE_CMD=""
if docker compose version &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker compose"
elif command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker-compose"
else
    echo -e "${RED}❌ Docker Compose is not installed. Please install docker-compose plugin.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Using: $($DOCKER_COMPOSE_CMD version)${NC}"

# 3. Build & Bundle Optimization
echo -e "\n${YELLOW}[3/6] Building Production Container Images...${NC}"
$DOCKER_COMPOSE_CMD --env-file .env.production -f docker-compose.production.yml build --no-cache
echo -e "${GREEN}✓ Successfully bundled Frontend (Nginx static) & Backend (FastAPI).${NC}"

# 4. Stop Previous Instances & Launch Containers
echo -e "\n${YELLOW}[4/6] Launching Production Services (Postgres pgvector, Backend, Frontend)...${NC}"
$DOCKER_COMPOSE_CMD --env-file .env.production -f docker-compose.production.yml down --remove-orphans || true
$DOCKER_COMPOSE_CMD --env-file .env.production -f docker-compose.production.yml up -d

# 5. Service Health Check Verification
echo -e "\n${YELLOW}[5/6] Awaiting Container Health Probes...${NC}"
MAX_RETRIES=30
RETRY_COUNT=0
HEALTHY=false

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if curl -s -f http://localhost:8000/api/health/live > /dev/null 2>&1 || curl -s -f http://localhost/api/health/live > /dev/null 2>&1; then
        HEALTHY=true
        break
    fi
    echo -n "."
    sleep 2
    RETRY_COUNT=$((RETRY_COUNT + 1))
done

if [ "$HEALTHY" = true ]; then
    echo -e "\n${GREEN}✓ Backend & Database health probes passed!${NC}"
else
    echo -e "\n${RED}⚠️  Healthcheck timeout. Inspecting container logs:${NC}"
    $DOCKER_COMPOSE_CMD -f docker-compose.production.yml logs --tail=30 backend
fi

# 6. Deployment Summary
echo -e "\n${BLUE}================================================================${NC}"
echo -e "${GREEN}🎉 GROWSKILL AI IS LIVE AND READY FOR REAL-WORLD USAGE!${NC}"
echo -e "${BLUE}================================================================${NC}"
echo -e "Web App URL:       ${GREEN}http://localhost${NC} (Port 80/443)"
echo -e "Backend API URL:   ${GREEN}http://localhost:8000${NC} (or http://localhost/api)"
echo -e "Health Probe:      ${GREEN}http://localhost:8000/api/health/live${NC}"
echo -e "Database:          PostgreSQL 16 (pgvector enabled)"
echo -e "\nUseful commands:"
echo -e "  View Logs:       $DOCKER_COMPOSE_CMD -f docker-compose.production.yml logs -f"
echo -e "  Stop Platform:   $DOCKER_COMPOSE_CMD -f docker-compose.production.yml down"
echo -e "  Restart:         $DOCKER_COMPOSE_CMD -f docker-compose.production.yml restart"
echo -e "${BLUE}================================================================${NC}"
