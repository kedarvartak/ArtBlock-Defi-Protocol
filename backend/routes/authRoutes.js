import express from 'express';
import { registerUser, loginUser } from '../services/authService.js';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, password, walletAddress } = req.body;
    const result = await registerUser({ username, password, walletAddress });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { password, walletAddress } = req.body;
    const result = await loginUser({ password, walletAddress });
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// Test auth route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes working!' });
});

export default router; 