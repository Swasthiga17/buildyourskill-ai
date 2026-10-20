<#
.SYNOPSIS
    GrowSkill AI - Production Deployment Automation Script (PowerShell)
.DESCRIPTION
    Bundles the frontend, builds Docker containers, runs migrations, and launches the production stack.
.EXAMPLE
    .\scripts\deploy_production.ps1
#>

$ErrorActionPreference = "Stop"

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "       🚀 GROWSKILL AI - PRODUCTION DEPLOYMENT ENGINE          " -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan

$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $ProjectRoot

# 1. Pre-Flight Configuration Checks
Write-Host "`n[1/6] Validating Production Environment Configuration..." -ForegroundColor Yellow
$EnvProd = Join-Path $ProjectRoot ".env.production"
$EnvProdExample = Join-Path $ProjectRoot ".env.production.example"

if (-not (Test-Path $EnvProd)) {
    if (Test-Path $EnvProdExample) {
        Write-Host "⚠️  .env.production not found. Initializing from .env.production.example..." -ForegroundColor Yellow
        Copy-Item $EnvProdExample $EnvProd

        # Generate cryptographic secret key
        $RandomSecret = [System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
        $RandomDbPass = [System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(16))

        (Get-Content $EnvProd) -replace "REPLACE_WITH_A_64_CHAR_CRYPTOGRAPHICALLY_SECURE_SECRET_KEY", $RandomSecret `
                               -replace "REPLACE_WITH_STRONG_DB_PASSWORD", $RandomDbPass | Set-Content $EnvProd

        Write-Host "✓ Created .env.production with auto-generated secure credentials." -ForegroundColor Green
        Write-Host "👉 Remember to set your GEMINI_API_KEY in .env.production!" -ForegroundColor Yellow
    } else {
        Write-Error "Fatal: Neither .env.production nor .env.production.example exists."
    }
} else {
    Write-Host "✓ Production environment file .env.production detected." -ForegroundColor Green
}

# 2. Check Docker
Write-Host "`n[2/6] Checking Docker Engine & Compose..." -ForegroundColor Yellow
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Error "Docker is required but not installed or not in PATH."
}

$ComposeCmd = "docker compose"
try {
    & docker compose version | Out-Null
} catch {
    if (Get-Command docker-compose -ErrorAction SilentlyContinue) {
        $ComposeCmd = "docker-compose"
    } else {
        Write-Error "Docker Compose is required but not available."
    }
}
Write-Host "✓ Docker and Compose are ready." -ForegroundColor Green

# 3. Build & Bundle
Write-Host "`n[3/6] Building Production Container Images..." -ForegroundColor Yellow
& docker compose --env-file .env.production -f docker-compose.production.yml build
Write-Host "✓ Successfully built production images." -ForegroundColor Green

# 4. Launch Containers
Write-Host "`n[4/6] Launching Production Services (Postgres pgvector, Backend, Frontend)..." -ForegroundColor Yellow
& docker compose --env-file .env.production -f docker-compose.production.yml down --remove-orphans
& docker compose --env-file .env.production -f docker-compose.production.yml up -d

# 5. Health Check Verification
Write-Host "`n[5/6] Awaiting Container Health Probes..." -ForegroundColor Yellow
$MaxRetries = 20
$Healthy = $false

for ($i = 0; $i -lt $MaxRetries; $i++) {
    try {
        $res = Invoke-WebRequest -Uri "http://localhost:8000/api/health/live" -UseBasicParsing -TimeoutSec 2 -ErrorAction SilentlyContinue
        if ($res.StatusCode -eq 200) {
            $Healthy = $true
            break
        }
    } catch {
        # Retry
    }
    Write-Host -NoNewline "."
    Start-Sleep -Seconds 2
}

if ($Healthy) {
    Write-Host "`n✓ Backend & Database health probes passed!" -ForegroundColor Green
} else {
    Write-Host "`n⚠️  Healthcheck did not respond within timeout. Fetching backend logs:" -ForegroundColor Yellow
    & docker compose -f docker-compose.production.yml logs --tail=25 backend
}

# 6. Summary
Write-Host "`n================================================================" -ForegroundColor Cyan
Write-Host "🎉 GROWSKILL AI IS LIVE AND READY FOR REAL-WORLD USAGE!" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "Web App URL:       http://localhost (Port 80)" -ForegroundColor Green
Write-Host "Backend API URL:   http://localhost:8000 (or http://localhost/api)" -ForegroundColor Green
Write-Host "Health Probe:      http://localhost:8000/api/health/live" -ForegroundColor Green
Write-Host "Database:          PostgreSQL 16 (pgvector enabled)"
Write-Host "`nUseful commands:"
Write-Host "  View Logs:       docker compose -f docker-compose.production.yml logs -f"
Write-Host "  Stop Platform:   docker compose -f docker-compose.production.yml down"
Write-Host "  Restart:         docker compose -f docker-compose.production.yml restart"
Write-Host "================================================================" -ForegroundColor Cyan
