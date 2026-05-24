@echo off
title AI Startup Evaluator
echo ==========================================
echo   AI Startup Idea Evaluator - Starting
echo ==========================================
echo.

REM Step 1: Start MongoDB automatically
echo [1/3] Starting MongoDB...
net start MongoDB >nul 2>&1
timeout /t 2 /nobreak > nul

REM Step 2: Start Backend
echo [2/3] Starting Backend on port 5000...
start "BACKEND - AI Evaluator" cmd /k "cd /d "D:\freshathon ai\backend" && node server.js"
timeout /t 5 /nobreak > nul

REM Step 3: Start Frontend
echo [3/3] Starting Frontend on port 3000...
start "FRONTEND - AI Evaluator" cmd /k "cd /d "D:\freshathon ai\frontend" && npm start"

echo.
echo ==========================================
echo  Website: http://localhost:3000
echo ==========================================
echo.
echo Waiting 30 seconds for everything to load...
timeout /t 30 /nobreak > nul
start http://localhost:3000/
pause
