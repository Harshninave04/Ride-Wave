// controllers/rideController.js

import Ride from '../models/Ride.js'; // Ride model (we'll create this)
import User from '../models/User.js';

// Passenger requests a ride
export const requestRide = async (req, res) => {
  try {
    const { pickupLocation, dropoffLocation } = req.body;

    const ride = new Ride({
      passenger: req.user.id, // Logged-in user is the passenger
      pickupLocation,
      dropoffLocation,
      status: 'Pending', // Default status
    });

    await ride.save();
    res.status(201).json({ message: 'Ride request created', ride });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Driver accepts a ride
export const acceptRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId);

    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    // Check if the ride is already accepted
    if (ride.status !== 'Pending') {
      return res.status(400).json({ message: 'Ride is not available' });
    }

    // Mark ride as accepted by the driver
    ride.driver = req.user.id;
    ride.status = 'Accepted';
    await ride.save();

    res.status(200).json({ message: 'Ride accepted', ride });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// View ride status
export const viewRideStatus = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId);

    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    res.status(200).json({ ride });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
