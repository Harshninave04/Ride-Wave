import axios from 'axios';

// API base URL
const API_URL = 'http://localhost:5000/api/rides';

// Function to request a new ride
export const requestRide = async (pickupLocation, dropoffLocation, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/request`,
      { pickupLocation, dropoffLocation },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error requesting ride:', error);
    throw error;
  }
};

// Function to accept a ride (driver only)
export const acceptRide = async (rideId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/accept/${rideId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error accepting ride:', error);
    throw error;
  }
};

// Function to start a ride (driver only)
export const startRide = async (rideId, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/start/${rideId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error starting ride:', error);
    throw error;
  }
};

// Function to complete a ride (driver only)
export const completeRide = async (rideId, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/complete/${rideId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error completing ride:', error);
    throw error;
  }
};

// Function to view ride status
export const viewRideStatus = async (rideId, token) => {
  try {
    const response = await axios.get(`${API_URL}/status/${rideId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error viewing ride status:', error);
    throw error;
  }
};
