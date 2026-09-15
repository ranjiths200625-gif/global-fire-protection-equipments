@echo off
title Push Global Fire Protection Equipments to GitHub
echo ========================================================
echo Pushing project to GitHub...
echo Repository: https://github.com/ranjiths200625-gif/global-fire-protection-equipments.git
echo ========================================================
echo.

cd /d "%~dp0"
git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo SUCCESS! Your project has been uploaded to GitHub!
    echo Now open Vercel and click Deploy.
    echo ========================================================
) else (
    echo ========================================================
    echo Push failed. Please make sure you are signed in as ranjiths200625-gif
    echo ========================================================
)
echo.
pause
