import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  requestRide,
  acceptRide,
  viewRideStatus,
  startRide,
  completeRide,
} from '../controllers/rideController.js';

const router = express.Router();

// Passenger creates a ride request (Protected)
router.post('/request', protect, requestRide);

// Driver accepts a ride (Protected)
router.post('/accept/:rideId', protect, acceptRide);

// View ride status (Protected)
router.get('/status/:rideId', protect, viewRideStatus);

// Driver starts the ride (Protected)
router.put('/start/:rideId', protect, startRide);

// Driver completes the ride (Protected)
router.put('/complete/:rideId', protect, completeRide);

export default router;
