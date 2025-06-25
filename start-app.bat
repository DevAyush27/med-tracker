@echo off
echo Starting MedTrack Application...
echo.

echo Starting Backend Server...
cd "Med tracker\server"
start "Backend Server" cmd /k "npm start"

echo.
echo Starting Frontend Server...
cd "..\client"
start "Frontend Server" cmd /k "npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause >nul 