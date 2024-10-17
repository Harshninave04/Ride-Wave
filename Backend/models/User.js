// models/User.js
import mongoose from 'mongoose';

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['passenger', 'driver', 'admin'],
      default: 'passenger',
    },
  },
  {
    timestamps: true, // Automatically create 'createdAt' and 'updatedAt' timestamps
  },
);

const User = mongoose.model('User', userSchema);
export default User;
