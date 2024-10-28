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

// Function to fetch recent rides for a passenger
export const fetchRecentRides = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/recent`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.rides; // Assuming the response includes rides in a 'rides' array
  } catch (error) {
    console.error('Error fetching recent rides:', error);
    throw error;
  }
};

// Function to accept a ride request (for drivers)
export const acceptRideRequest = async (rideId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/accept/${rideId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Return the accepted ride data
  } catch (error) {
    console.error('Error accepting ride request:', error);
    throw error; // Propagate the error to be handled in the component
  }
};

// Function to reject a ride request (for drivers)
export const rejectRideRequest = async (rideId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/reject/${rideId}`,  // Assuming your API has a 'reject' endpoint
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Passing the auth token for security
        },
      }
    );
    return response.data; // Return the rejected ride response data (if any)
  } catch (error) {
    console.error('Error rejecting ride request:', error);
    throw error; // Propagate the error to handle in the component
  }
};


// Function to get available ride requests (for drivers)
export const getAvailableRideRequests = async (token) => {
  const response = await fetch(`${API_URL}/available`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch ride requests');
  }

  const data = await response.json();

  // Check if "rides" array exists
  return data.rides || [];
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
