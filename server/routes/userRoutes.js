import express from 'express';
import {
  userCredits,
  paymentRazorpay,
  verifyRazorpay,
  registerUser,
  loginUser,
  paymentStripe,
  verifyStripe
} from '../controllers/UserController.js';
import authUser from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/credits', authUser, userCredits);
router.post('/pay-razor', authUser, paymentRazorpay);
router.post('/verify-razor', authUser, verifyRazorpay);
router.post('/pay-stripe', authUser, paymentStripe);
router.post('/verify-stripe', authUser, verifyStripe);

export default router;
