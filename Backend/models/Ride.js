// models/Ride.js
import mongoose from 'mongoose';

const rideSchema = mongoose.Schema(
  {
    passenger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference the User model
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null, // Initially no driver
    },
    pickupLocation: {
      type: String,
      required: true,
    },
    dropoffLocation: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'In Progress', 'Completed', 'Rejected'],
      default: 'Pending',
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt timestamps
  },
);

const Ride = mongoose.model('Ride', rideSchema);
export default Ride;
