@echo off
echo ========================================
echo KKBP Quick Start (Without MySQL Setup)
echo ========================================
echo.
echo This script will:
echo 1. Start the backend (auto-creates tables)
echo 2. Start the frontend
echo.
echo NOTE: Make sure MySQL is running first!
echo.
echo Press Ctrl+C to cancel, or
pause

echo.
echo Starting Backend Server...
echo.
start cmd /k "cd backend && npm run dev"

timeout /t 5 /nobreak > nul

echo.
echo Starting Frontend...
echo.
start cmd /k "cd frontend && npm start"

echo.
echo ========================================
echo Servers Starting...
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Two new windows will open.
echo Close this window when done.
echo.
pause
