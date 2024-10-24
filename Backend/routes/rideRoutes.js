import express from 'express';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';
import {
  requestRide,
  acceptRide,
  viewRideStatus,
  startRide,
  completeRide,
  getAvailableRides,
  rejectRide,
} from '../controllers/rideController.js';

const router = express.Router();

// Passenger creates a ride request (Protected)
router.post('/request', protect, requestRide);

// Driver accepts a ride (Protected)
router.post('/accept/:rideId', protect, restrictTo('driver'), acceptRide);

// Driver rejects a ride (Protected)
router.post('/reject/:rideId', protect, restrictTo('driver'), rejectRide);

// View ride status (Protected)
router.get('/status/:rideId', protect, viewRideStatus);

// Driver starts the ride (Protected)
router.put('/start/:rideId', protect, startRide);

// Driver completes the ride (Protected)
router.put('/complete/:rideId', protect, completeRide);

// Get available ride requests (for drivers)
router.get('/available', protect, restrictTo('driver'), getAvailableRides);

export default router;
