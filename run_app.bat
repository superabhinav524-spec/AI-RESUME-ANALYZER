@echo off
title ResumeAI Pro — Executive ATS Suite
cls
echo ===================================================
echo           Starting ResumeAI PRO Suite
echo ===================================================
echo.
cd /d "%~dp0"

where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Python was not found in PATH. Opening index.html directly in browser...
    start "" index.html
    pause
    exit /b
)

python server.py
pause
