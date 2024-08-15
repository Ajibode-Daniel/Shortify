import express from 'express';
import {
  signupUser,
  loginUser,
  getUserProfile,
} from '../controllers/authController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

export default router;
