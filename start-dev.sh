#!/bin/bash

echo "Starting NotesApp Development Environment..."
echo

echo "Installing dependencies..."
npm run install-all

echo
echo "Starting backend server in background..."
cd notesapp-backend && npm run dev &
BACKEND_PID=$!

echo
echo "Waiting 5 seconds for backend to start..."
sleep 5

echo
echo "Starting frontend development server..."
cd ../notesapp-frontend && npm run dev &
FRONTEND_PID=$!

echo
echo "Development environment started!"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait