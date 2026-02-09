@echo off
echo ================================================
echo INICIANDO APLICAÇÃO FINANCIAL MANAGEMENT
echo ================================================

REM Verificar se Docker está instalado
docker --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker não está instalado. Por favor, instale o Docker primeiro.
    exit /b 1
)
echo [SUCCESS] Docker encontrado

echo.
echo  Iniciando MongoDB...
docker rm -f mongo_financial 2>nul || echo.
docker run -d ^
    --name mongo_financial ^
    -p 27017:27017 ^
    -e MONGO_INITDB_DATABASE=financial_management ^
    mongo:6

if errorlevel 1 (
    echo [ERROR] Falha ao iniciar MongoDB
    exit /b 1
)

echo [SUCCESS] Container MongoDB criado
echo ⏳ Aguardando MongoDB iniciar...
timeout /t 5 /nobreak >nul

echo.
echo 🚀 Iniciando Backend...
cd backend
if errorlevel 1 (
    echo [ERROR] Pasta 'backend' não encontrada
    exit /b 1
)

REM Verificar se node_modules existe
if not exist node_modules (
    echo [WARNING] node_modules não encontrado. Instalando dependências...
    npm install
    if errorlevel 1 (
        echo [ERROR] Falha ao instalar dependências do backend
        exit /b 1
    )
)

REM Verificar se .env existe
if not exist .env (
    echo [WARNING] Arquivo .env não encontrado. Criando padrão...
    (
        echo MONGODB_URI=mongodb://localhost:27017/financial_management
        echo JWT_SECRET=sua_chave_secreta_jwt_aqui_32_caracteres
        echo JWT_EXPIRATION=1d
        echo PORT=3000
        echo NODE_ENV=development
    ) > .env
)

echo  Iniciando servidor backend na porta 3000...
start "Backend" cmd /k "npm run start"
timeout /t 5 /nobreak >nul
cd ..

echo.
echo  Iniciando Frontend...
cd frontend
if errorlevel 1 (
    echo [ERROR] Pasta 'frontend' não encontrada
    exit /b 1
)

REM Verificar se node_modules existe
if not exist node_modules (
    echo [WARNING] node_modules não encontrado. Instalando dependências...
    npm install
    if errorlevel 1 (
        echo [ERROR] Falha ao instalar dependências do frontend
        exit /b 1
    )
)

REM Verificar se .env.local existe
if not exist .env.local (
    echo [WARNING] Arquivo .env.local não encontrado. Criando...
    echo NEXT_PUBLIC_API_URL=http://localhost:3000 > .env.local
)

echo  Iniciando frontend na porta 3001...
start "Frontend" cmd /k "npm run dev"
timeout /t 8 /nobreak >nul
cd ..

echo.
echo ================================================
echo APLICAÇÃO INICIADA COM SUCESSO!
echo ================================================
echo.
echo  STATUS DOS SERVIÇOS:
echo.
echo    MongoDB: Rodando na porta 27017
echo    Backend: Rodando em http://localhost:3000
echo   Frontend: Rodando em http://localhost:3001
echo.
echo  LINKS DA APLICAÇÃO:
echo.
echo    Frontend: http://localhost:3001
echo    Backend API: http://localhost:3000
echo     MongoDB: mongodb://localhost:27017/financial_management
echo.
echo   PARA PARAR A APLICAÇÃO, FECHE AS JANELAS DO CMD
echo    ou execute stop-app.bat
echo ================================================

echo.
echo Pressione qualquer tecla para sair...
pause >nul