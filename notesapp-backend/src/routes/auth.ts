import express from 'express';
import { body } from 'express-validator';
import { signup, verifyOTP, login, googleAuth } from '../controllers/authController';

const router = express.Router();

router.post('/signup', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').notEmpty().withMessage('Name is required')
], signup);

router.post('/verify-otp', verifyOTP);

router.post('/login', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], login);

router.post('/google', googleAuth);

export default router;