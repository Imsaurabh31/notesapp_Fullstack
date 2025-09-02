#!/bin/bash

echo "Building NotesApp for deployment..."

# Build backend
echo "Building backend..."
cd notesapp-backend
npm install
npm run build
cd ..

# Build frontend
echo "Building frontend..."
cd notesapp-frontend
npm install
npm run build
cd ..

echo "Build complete! Ready for deployment."