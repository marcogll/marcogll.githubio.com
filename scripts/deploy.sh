#!/bin/bash

# Deploy to Coolify via Git
# Usage: ./deploy.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "=== Portfolio Deploy Script ==="

# Pull latest changes
echo "[INFO] Pulling latest changes..."
git pull origin main

# Install dependencies
echo "[INFO] Installing dependencies..."
npm install

# Build
echo "[INFO] Building project..."
npm run build

# Restart PM2 if running
if command -v pm2 >/dev/null 2>&1; then
    echo "[INFO] Restarting PM2..."
    pm2 restart portfolio || pm2 start server.js --name portfolio
    pm2 save
else
    echo "[WARN] PM2 not found. Start manually with: node server.js"
fi

echo "[SUCCESS] Deploy complete!"