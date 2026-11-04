#!/data/data/com.termux/files/usr/bin/bash

set -euo pipefail

ENV_FILE=".env"
SUPABASE_URL="https://tudcfupmilawoakmsrum.supabase.co"

if [[ ! -f "$ENV_FILE" ]]; then
    echo "Error: .env file not found."
    exit 1
fi

echo "Supabase Admin Configuration"
echo "----------------------------"
echo "Project URL: $SUPABASE_URL"
echo

read -rsp "Enter your Supabase service-role key: " SERVICE_ROLE_KEY
echo

if [[ -z "$SERVICE_ROLE_KEY" ]]; then
    echo "Error: Service-role key cannot be empty."
    exit 1
fi

read -rsp "Confirm service-role key: " CONFIRM_KEY
echo

if [[ "$SERVICE_ROLE_KEY" != "$CONFIRM_KEY" ]]; then
    echo "Error: Keys do not match. No changes made."
    exit 1
fi

BACKUP_FILE=".env.backup.$(date +%Y%m%d_%H%M%S)"
cp -p "$ENV_FILE" "$BACKUP_FILE"

TEMP_FILE="$(mktemp)"

awk '
    !/^[[:space:]]*(SUPABASE_URL|SUPABASE_SERVICE_ROLE_KEY)=/
' "$ENV_FILE" > "$TEMP_FILE"

{
    printf '\nSUPABASE_URL=%s\n' "$SUPABASE_URL"
    printf 'SUPABASE_SERVICE_ROLE_KEY=%s\n' "$SERVICE_ROLE_KEY"
} >> "$TEMP_FILE"

cat "$TEMP_FILE" > "$ENV_FILE"
rm -f "$TEMP_FILE"

unset SERVICE_ROLE_KEY CONFIRM_KEY

chmod 600 "$ENV_FILE"

echo
echo "Configuration saved successfully."
echo "Backup created: $BACKUP_FILE"
echo "SUPABASE_URL: configured"
echo "SUPABASE_SERVICE_ROLE_KEY: configured"
echo "Other environment variables preserved."
