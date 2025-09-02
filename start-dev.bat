@echo off
echo Starting NotesApp Development Environment...
echo.

echo Installing dependencies...
call npm run install-all

echo.
echo Starting backend server...
start cmd /k "cd notesapp-backend && npm run dev"

echo.
echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo Starting frontend development server...
start cmd /k "cd notesapp-frontend && npm run dev"

echo.
echo Development environment started!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
pause