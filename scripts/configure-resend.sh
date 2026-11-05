#!/data/data/com.termux/files/usr/bin/bash

set -euo pipefail

ENV_FILE=".env"

if [[ ! -f "$ENV_FILE" ]]; then
  touch "$ENV_FILE"
fi

printf "Enter your new Resend API key: "
read -rs RESEND_KEY
printf "\n"

if [[ ! "$RESEND_KEY" =~ ^re_[A-Za-z0-9_-]+$ ]]; then
  echo "Invalid Resend API key format."
  unset RESEND_KEY
  exit 1
fi

if grep -q '^RESEND_API_KEY=' "$ENV_FILE"; then
  sed -i '/^RESEND_API_KEY=/d' "$ENV_FILE"
fi

printf 'RESEND_API_KEY=%s\n' "$RESEND_KEY" >> "$ENV_FILE"

chmod 600 "$ENV_FILE"
unset RESEND_KEY

echo "Resend API key saved securely to .env"
