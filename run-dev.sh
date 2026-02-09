#!/bin/bash

echo "🚀 Iniciando Sistema Financeiro - Modo Simples"
echo "=============================================="

# 1. Parar serviços existentes
echo "🛑 Parando serviços..."
docker-compose down 2>/dev/null || true

# 2. Remover pasta dist local
sudo rm -rf backend/dist 2>/dev/null || true

# 3. Iniciar MongoDB
echo "🐳 Iniciando MongoDB..."
docker-compose up -d mongodb

# 4. Aguardar MongoDB
echo "⏳ Aguardando MongoDB..."
sleep 5

# 5. Executar backend manualmente (fora do Docker)
echo "🔄 Iniciando Backend localmente..."
cd backend

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências do backend..."
    npm install
fi

# Build
echo "🔨 Fazendo build..."
npm run build

# Iniciar backend em background
echo "🚀 Iniciando backend na porta 3000..."
npm run start:dev &

# Voltar para raiz
cd ..

# 6. Iniciar frontend
echo "🌐 Iniciando frontend..."
cd frontend

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências do frontend..."
    npm install
fi

# Limpar cache
rm -rf .next 2>/dev/null || true

# Iniciar frontend em background
echo "🚀 Iniciando frontend na porta 3001..."
BROWSER=none npm run dev &

echo ""
echo "✅ Sistema iniciado!"
echo "📌 Frontend: http://localhost:3001"
echo "📌 Backend:  http://localhost:3000"
echo "📌 MongoDB:  mongodb://localhost:27017"
echo ""
echo "🛑 Para parar: pkill -f \"node\" && docker-compose down"