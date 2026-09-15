@echo off
title Deploy Global Fire Website to Vercel
echo ========================================================
echo Deploying Global Fire Protection Equipments to Vercel...
echo ========================================================
echo.

cd /d "%~dp0client"
call npx -y vercel --prod

echo.
echo ========================================================
echo Deployment process complete!
echo ========================================================
pause
