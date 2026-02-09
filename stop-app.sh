#!/bin/bash

# stop-app.sh - Script para parar toda a aplicação Financial Management

echo " Parando aplicação Financial Management..."

# Parar frontend
echo "  Parando frontend..."
pkill -f "npm run dev" 2>/dev/null || true

# Parar backend
echo "  Parando backend..."
pkill -f "npm run start" 2>/dev/null || true

# Parar MongoDB
echo "  Parando MongoDB..."
docker rm -f mongo_financial 2>/dev/null || true

echo ""
echo " Aplicação parada com sucesso!"
echo ""
echo "Serviços parados:"
echo "  • Frontend (porta 3001)"
echo "  • Backend (porta 3000)"
echo "  • MongoDB (porta 27017)"
