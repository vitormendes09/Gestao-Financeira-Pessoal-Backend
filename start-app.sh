#!/bin/bash

# start-app.sh - Script para inicializar toda a aplicação Financial Management

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funções de log
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se o Docker está instalado
check_docker() {
    if ! command -v docker &> /dev/null; then
        log_error "Docker não está instalado. Por favor, instale o Docker primeiro."
        exit 1
    fi
    log_success "Docker encontrado"
}

# Iniciar MongoDB
start_mongodb() {
    log_info " Iniciando MongoDB..."
    
    # Parar e remover container existente se houver
    docker rm -f mongo_financial 2>/dev/null || true
    
    # Iniciar novo container MongoDB
    docker run -d \
        --name mongo_financial \
        -p 27017:27017 \
        -e MONGO_INITDB_DATABASE=financial_management \
        mongo:6
    
    if [ $? -ne 0 ]; then
        log_error "Falha ao iniciar MongoDB"
        exit 1
    fi
    
    log_success "Container MongoDB criado"
    
    # Aguardar MongoDB iniciar
    log_info " Aguardando MongoDB iniciar (5 segundos)..."
    sleep 5
    
    # Verificar se MongoDB está rodando
    if docker ps | grep -q mongo_financial; then
        log_success " MongoDB rodando na porta 27017"
        echo -e "${BLUE} Conexão:${NC} mongodb://localhost:27017/financial_management"
        
        # Verificar logs iniciais
        log_info " Últimos logs do MongoDB:"
        docker logs mongo_financial --tail 5
    else
        log_error " Falha ao iniciar MongoDB"
        docker logs mongo_financial
        exit 1
    fi
}

# Iniciar Backend
start_backend() {
    log_info " Iniciando Backend..."
    
    # Verificar se a pasta backend existe
    if [ ! -d "backend" ]; then
        log_error "Pasta 'backend' não encontrada"
        exit 1
    fi
    
    cd backend || {
        log_error "Não foi possível acessar a pasta backend"
        exit 1
    }
    
    # Verificar se node_modules existe
    if [ ! -d "node_modules" ]; then
        log_warning "node_modules não encontrado. Instalando dependências..."
        npm install
        if [ $? -ne 0 ]; then
            log_error "Falha ao instalar dependências do backend"
            exit 1
        fi
        log_success "Dependências do backend instaladas"
    fi
    
    # Verificar se .env existe
    if [ ! -f ".env" ]; then
        log_warning "Arquivo .env não encontrado. Criando padrão..."
        cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/financial_management
JWT_SECRET=sua_chave_secreta_jwt_aqui_32_caracteres
JWT_EXPIRATION=1d
PORT=3000
NODE_ENV=development
EOF
        log_success "Arquivo .env criado com configurações padrão"
        log_warning " ATENÇÃO: Altere JWT_SECRET no arquivo .env para produção"
    fi
    
    # Iniciar backend em background
    log_info " Iniciando servidor backend na porta 3000..."
    npm run start &
    BACKEND_PID=$!
    
    # Aguardar backend iniciar
    log_info " Aguardando backend iniciar (5 segundos)..."
    sleep 5
    
    # Verificar se backend está rodando
    if curl -s http://localhost:3000 > /dev/null; then
        log_success " Backend rodando em: http://localhost:3000"
        log_success " Endpoints disponíveis:"
        echo -e "${BLUE}  • POST${NC}   /auth/signup    - Criar conta"
        echo -e "${BLUE}  • POST${NC}   /auth/login     - Fazer login"
        echo -e "${BLUE}  • POST${NC}   /transactions   - Criar transação"
        echo -e "${BLUE}  • GET${NC}    /transactions   - Listar transações"
        echo -e "${BLUE}  • GET${NC}    /transactions/balance - Obter saldo"
    else
        log_error " Falha ao iniciar backend"
        echo "Verificando logs do backend..."
        # Tentar capturar algum log de erro
        ps aux | grep "npm run start" | grep -v grep
        exit 1
    fi
    
    cd ..
}

# Iniciar Frontend
start_frontend() {
    log_info " Iniciando Frontend..."
    
    # Verificar se a pasta frontend existe
    if [ ! -d "frontend" ]; then
        log_error "Pasta 'frontend' não encontrada"
        exit 1
    fi
    
    cd frontend || {
        log_error "Não foi possível acessar a pasta frontend"
        exit 1
    }
    
    # Verificar se node_modules existe
    if [ ! -d "node_modules" ]; then
        log_warning "node_modules não encontrado. Instalando dependências..."
        npm install
        if [ $? -ne 0 ]; then
            log_error "Falha ao instalar dependências do frontend"
            exit 1
        fi
        log_success "Dependências do frontend instaladas"
    fi
    
    # Verificar se .env.local existe
    if [ ! -f ".env.local" ]; then
        log_warning "Arquivo .env.local não encontrado. Criando..."
        cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3000
PORT=3001
EOF
        log_success "Arquivo .env.local criado"
    fi
    
    # Adicionar PORT=3001 ao package.json scripts se não existir
    if ! grep -q "PORT=3001" package.json; then
        log_info "Configurando frontend para usar porta 3001..."
        # Adicionar variável de ambiente PORT ao script dev
        sed -i 's/"dev": "next dev"/"dev": "PORT=3001 next dev"/' package.json
    fi
    
    # Iniciar frontend em background
    log_info "🏃 Iniciando frontend na porta 3001..."
    PORT=3001 npm run dev &
    FRONTEND_PID=$!
    
    # Aguardar frontend iniciar
    log_info " Aguardando frontend iniciar (8 segundos)..."
    sleep 8
    
    # Verificar se frontend está rodando
    if curl -s http://localhost:3001 > /dev/null; then
        log_success " Frontend rodando em: http://localhost:3001"
    else
        log_warning "  Frontend pode estar demorando para iniciar. Verifique manualmente em http://localhost:3001"
        # Tentar verificar processo
        if ps -p $FRONTEND_PID > /dev/null; then
            log_info " Processo frontend ainda rodando (PID: $FRONTEND_PID)"
        fi
    fi
    
    cd ..
}

# Mostrar status da aplicação
show_status() {
    echo ""
    echo "================================================"
    echo -e "${GREEN} APLICAÇÃO INICIADA COM SUCESSO!${NC}"
    echo "================================================"
    echo ""
    echo -e "${BLUE} STATUS DOS SERVIÇOS:${NC}"
    echo ""
    
    # MongoDB status
    if docker ps | grep -q mongo_financial; then
        echo -e "   ${GREEN}MongoDB:${NC} Rodando na porta 27017"
    else
        echo -e "   ${RED}MongoDB:${NC} Parado"
    fi
    
    # Backend status
    if curl -s http://localhost:3000 > /dev/null; then
        echo -e "   ${GREEN}Backend:${NC} Rodando em http://localhost:3000"
    else
        echo -e "   ${RED}Backend:${NC} Parado"
    fi
    
    # Frontend status
    if curl -s http://localhost:3001 > /dev/null; then
        echo -e "   ${GREEN}Frontend:${NC} Rodando em http://localhost:3001"
    else
        echo -e "    ${YELLOW}Frontend:${NC} Verifique em http://localhost:3001"
    fi
    
    echo ""
    echo -e "${BLUE} LINKS DA APLICAÇÃO:${NC}"
    echo ""
    echo -e "   ${GREEN}Frontend:${NC} http://localhost:3001"
    echo -e "   ${BLUE}Backend API:${NC} http://localhost:3000"
    echo -e "    ${YELLOW}MongoDB:${NC} mongodb://localhost:27017/financial_management"
    echo ""
    echo -e "${BLUE} TESTE RÁPIDO:${NC}"
    echo ""
    echo "  1. Acesse http://localhost:3001"
    echo "  2. Crie uma conta ou faça login"
    echo "  3. Teste criar uma transação"
    echo ""
    echo -e "${YELLOW}  PARA PARAR A APLICAÇÃO, EXECUTE:${NC} ./stop-app.sh"
    echo "================================================"
}

# Criar script de parada
create_stop_script() {
    cat > stop-app.sh << 'EOF'
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
EOF

    chmod +x stop-app.sh
    log_success "Script de parada criado: ./stop-app.sh"
}

# Função principal
main() {
    echo ""
    echo "================================================"
    echo -e "${GREEN} INICIANDO APLICAÇÃO FINANCIAL MANAGEMENT${NC}"
    echo "================================================"
    echo ""
    
    # Verificar Docker
    check_docker
    
    # Iniciar serviços
    start_mongodb
    start_backend
    start_frontend
    
    # Criar script de parada
    create_stop_script
    
    # Mostrar status
    show_status
    
    # Manter script rodando e mostrar logs
    echo ""
    echo -e "${YELLOW} MONITORANDO LOGS (Ctrl+C para parar):${NC}"
    echo "================================================"
    
    # Função para limpeza ao sair
    cleanup() {
        echo ""
        echo -e "${YELLOW} Encerrando aplicação...${NC}"
        ./stop-app.sh
        exit 0
    }
    
    # Capturar Ctrl+C
    trap cleanup INT
    
    # Mostrar logs em tempo real
    echo -e "${BLUE}Logs do Backend:${NC} tail -f backend/nestjs.log (se existir)"
    echo -e "${BLUE}Logs do Frontend:${NC} verifique terminal onde frontend foi iniciado"
    echo -e "${BLUE}Logs do MongoDB:${NC} docker logs -f mongo_financial"
    echo ""
    echo -e "${YELLOW}Pressione Ctrl+C para parar todos os serviços${NC}"
    
    # Manter script rodando
    wait
}

# Executar função principal
main