import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import artistRoutes from './routes/artistRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/artist', artistRoutes);

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

console.log('Environment Variables Loaded:', {
  VERBWIRE_API_KEY_LENGTH: process.env.VERBWIRE_API_KEY?.length,
  VERBWIRE_API_KEY_PREFIX: process.env.VERBWIRE_API_KEY?.substring(0, 10) + '...'
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 