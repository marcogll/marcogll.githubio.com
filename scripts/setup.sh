#!/bin/bash

# Portfolio Setup Script
# Usage: ./setup.sh [domain] [port]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PORTFOLIO_DIR="$(dirname "$SCRIPT_DIR")"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    log_warn "Not running as root. Some operations may fail."
fi

# Parse arguments
DOMAIN="${1:-localhost}"
PORT="${2:-3002}"
TIMEZONE="${3:-America/Monterrey}"

log_info "Starting Portfolio setup..."
log_info "Domain: $DOMAIN"
log_info "Port: $PORT"
log_info "Timezone: $TIMEZONE"

# Check prerequisites
command -v node >/dev/null 2>&1 || { log_error "Node.js is not installed."; exit 1; }
command -v npm >/dev/null 2>&1 || { log_error "npm is not installed."; exit 1; }

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    log_info "Installing dependencies..."
    npm install
fi

# Build the project
log_info "Building project..."
npm run build

# Create production environment file
log_info "Creating environment file..."
cat > .env << EOF
PORT=$PORT
TIMEZONE=$TIMEZONE
CONTACT_WEBHOOK=
VITE_API_PASSWORD=
EOF

log_info "Setup complete!"
log_info "To start the server: node server.js"
log_info "Or with PM2: pm2 start server.js --name portfolio"