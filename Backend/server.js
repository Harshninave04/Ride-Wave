// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import rideRoutes from './routes/rideRoutes.js';

// Initialize environment variables
dotenv.config();

// Initialize the express app
const app = express();

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // Enable CORS

// Connect to the database
connectDB();


// API Routes
app.use('/api/users', userRoutes);  // User-related routes
app.use('/api/rides', rideRoutes);  // Ride-related routes

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to RideWave API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
