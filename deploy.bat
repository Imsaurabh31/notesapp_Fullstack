@echo off
echo Building NotesApp for deployment...

echo Building backend...
cd notesapp-backend
call npm install
call npm run build
cd ..

echo Building frontend...
cd notesapp-frontend
call npm install
call npm run build
cd ..

echo Build complete! Ready for deployment.
echo.
echo Next steps:
echo 1. Deploy backend to Railway: https://railway.app
echo 2. Deploy frontend to Vercel: https://vercel.com
echo 3. Check DEPLOYMENT.md for detailed instructions
pause