// src/api/auth.js

const API_URL = 'http://localhost:5000/api'; // Replace with your backend API URL

export const login = async (email, password) => {
  try {
    // Make POST request to login endpoint
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Send data as JSON
      },
      body: JSON.stringify({ email, password }), // Send email and password in request body
    });

    // If response is not OK, throw an error
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response to show details if available
      throw new Error(errorData.message || 'Login failed');
    }

    // If successful, parse the response and return it
    return await response.json(); // Assuming the response contains { token, user }
  } catch (error) {
    console.error('Error during login:', error);
    throw error; // Throw error to be handled in the component
  }
};

export const signup = async (name, email, password, role) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, role }),
  });
  if (!response.ok) {
    throw new Error('Signup failed');
  }
  return await response.json();
};

export const fetchUserProfile = async (token) => {
  const response = await fetch(`${API_URL}/users/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`, // Pass token to the backend
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized'); // Handle invalid token (remove it later)
    }
    throw new Error('Failed to fetch user profile');
  }

  return await response.json(); // Return the user profile data
};

