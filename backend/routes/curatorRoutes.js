import express from 'express';
import { getCuratorDashboard } from '../controllers/curatorController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard/:id', authenticateToken, getCuratorDashboard);

export default router; 