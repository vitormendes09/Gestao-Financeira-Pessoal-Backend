@echo off
echo  Parando aplicação Financial Management...

echo   Parando frontend...
taskkill /F /IM node.exe 2>nul || echo.

echo   Parando backend...
taskkill /F /IM node.exe 2>nul || echo.

echo   Parando MongoDB...
docker rm -f mongo_financial 2>nul || echo.

echo.
echo  Aplicação parada com sucesso!
echo.
echo Serviços parados:
echo   • Frontend (porta 3001)
echo   • Backend (porta 3000)
echo   • MongoDB (porta 27017)

timeout /t 3 /nobreak >nul