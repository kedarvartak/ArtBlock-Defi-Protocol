import express from 'express';
import { registerUser, loginUser } from '../services/authService.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Registration route error:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
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