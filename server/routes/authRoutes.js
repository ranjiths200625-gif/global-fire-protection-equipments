import express from 'express';
import { login, getMe, updateCredentials } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/login', authLimiter, login);
router.get('/me', protect, getMe);
router.put('/update-credentials', protect, updateCredentials);

export default router;

