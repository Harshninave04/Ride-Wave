// routes/userRoutes.js
import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js'; // Middleware to protect routes

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Profile route (Protected)
router.get('/profile', protect, getUserProfile);

export default router;
