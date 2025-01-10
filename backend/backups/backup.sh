#!/bin/bash
DATE=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_FILE="prisma_backup_$DATE.sql"
pg_dump -U admin -h localhost -p 5432 hospital > /$BACKUP_FILE

# crontab -e
# 0 0 * * * /path/to/backup_script.sh
# psql -U admin -h localhost -p 5432 hospital < /$BACKUP_FILE.sql

