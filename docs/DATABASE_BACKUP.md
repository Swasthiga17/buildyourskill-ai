# Database Backup & Disaster Recovery Strategy

**Product:** BuildYourSkill AI / GrowSkill AI  
**Engine:** Managed PostgreSQL 16+ with `pgvector`

---

## 1. Backup Strategy Overview

| Tier | Mechanism | Frequency | Retention | RPO / RTO Target |
|:---|:---|:---|:---|:---|
| **Point-in-Time Recovery (PITR)** | Continuous WAL Archiving | Continuous (every 60s) | 7 Days | RPO: < 5 mins, RTO: < 30 mins |
| **Automated Daily Snapshots** | Native Managed Snapshot (AWS RDS / Neon / Supabase) | Daily @ 02:00 UTC | 30 Days | RPO: < 24 hrs, RTO: < 15 mins |
| **Weekly Encrypted Dumps** | Logical `pg_dump` to S3 / GCS Cold Storage | Weekly (Sundays @ 03:00 UTC) | 90 Days | Disaster Recovery fallback |

---

## 2. Automated Logical Backup Script (`pg_dump`)

Run via cron job or Kubernetes scheduled job:

```bash
#!/bin/bash
set -eo pipefail

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/backups/postgres"
BACKUP_FILE="${BACKUP_DIR}/growskill_prod_${TIMESTAMP}.dump"

mkdir -p "${BACKUP_DIR}"

echo "Starting logical PostgreSQL backup: ${BACKUP_FILE}..."

# Export schema + data in compressed custom format with vector indexes
PGPASSWORD="${POSTGRES_PASSWORD}" pg_dump \
  -h "${POSTGRES_HOST}" \
  -U "${POSTGRES_USER}" \
  -d "${POSTGRES_DB}" \
  -F c \
  -b \
  -v \
  -f "${BACKUP_FILE}"

echo "Encrypting backup with AES-256..."
gpg --symmetric --cipher-algo AES256 --batch --passphrase "${BACKUP_ENCRYPTION_KEY}" "${BACKUP_FILE}"
rm "${BACKUP_FILE}"

echo "Uploading encrypted backup to immutable cloud storage bucket..."
aws s3 cp "${BACKUP_FILE}.gpg" "s3://${S3_BACKUP_BUCKET}/db-backups/" --sse aws:kms

echo "Backup complete."
```

---

## 3. Restore & Disaster Recovery Procedure

To restore an empty production database from an encrypted dump:

```bash
# 1. Download and decrypt the snapshot
aws s3 cp "s3://${S3_BACKUP_BUCKET}/db-backups/growskill_prod_20260828.dump.gpg" ./
gpg --decrypt --batch --passphrase "${BACKUP_ENCRYPTION_KEY}" growskill_prod_20260828.dump.gpg > restore.dump

# 2. Re-create target database and verify pgvector extension
PGPASSWORD="${POSTGRES_PASSWORD}" psql -h "${POSTGRES_HOST}" -U "${POSTGRES_USER}" -c "CREATE EXTENSION IF NOT EXISTS vector;" -d growskill_prod

# 3. Restore database schema, tables, and vector embeddings
PGPASSWORD="${POSTGRES_PASSWORD}" pg_restore \
  -h "${POSTGRES_HOST}" \
  -U "${POSTGRES_USER}" \
  -d growskill_prod \
  --clean \
  --if-exists \
  --no-owner \
  -v restore.dump

# 4. Verify table row counts and vector chunk integrity
PGPASSWORD="${POSTGRES_PASSWORD}" psql -h "${POSTGRES_HOST}" -U "${POSTGRES_USER}" -d growskill_prod -c "SELECT count(*) FROM users; SELECT count(*) FROM document_chunks;"
```
