import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import artistRoutes from './routes/artistRoutes.js';
import curatorRoutes from './routes/curatorRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import eventListenerService from './services/eventListenerService.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/artist', artistRoutes);
app.use('/api/curator', curatorRoutes);
app.use('/api/galleries', galleryRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start blockchain event listeners
eventListenerService.startListening()
  .then(() => console.log('Blockchain event listeners started'))
  .catch(err => console.error('Failed to start blockchain listeners:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 