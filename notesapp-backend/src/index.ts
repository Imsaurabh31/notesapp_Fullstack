import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/simpleAuth';
import noteRoutes from './routes/simpleNotes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Routes (using simple in-memory storage)
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// MongoDB connection (optional for testing)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/notesapp')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.log('MongoDB not available, using memory storage for testing');
    console.error('MongoDB connection error:', error.message);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});