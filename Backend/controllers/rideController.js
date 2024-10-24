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

// Get available ride requests (rides with 'Pending' status)
export const getAvailableRides = async (req, res) => {
  try {
    // Find rides that are still pending (not accepted by a driver)
    const availableRides = await Ride.find({ status: 'Pending' });

    if (availableRides.length === 0) {
      return res.status(200).json({ message: 'No available rides at the moment', rides: [] });
    }

    res.status(200).json({ rides: availableRides });
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

// Driver starts the ride
export const startRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId);

    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    if (ride.status !== 'Accepted') {
      return res.status(400).json({ message: 'Cannot start ride unless it is accepted' });
    }

    // Ensure only the driver assigned to this ride can start it
    if (ride.driver.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to start this ride' });
    }

    // Update status to "In Progress"
    ride.status = 'In Progress';
    await ride.save();

    res.status(200).json({ message: 'Ride started', ride });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Driver completes the ride
export const completeRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId);

    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    if (ride.status !== 'In Progress') {
      return res.status(400).json({ message: 'Cannot complete ride unless it is in progress' });
    }

    // Ensure only the driver assigned to this ride can complete it
    if (ride.driver.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to complete this ride' });
    }

    // Update status to "Completed"
    ride.status = 'Completed';
    await ride.save();

    res.status(200).json({ message: 'Ride completed', ride });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};