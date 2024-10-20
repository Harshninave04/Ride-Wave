// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import { fetchUserProfile } from '../api/auth'; // Function to fetch the user's profile from backend

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user state
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const token = localStorage.getItem('token'); // Check for token in localStorage
    if (token) {
      fetchUserProfile(token) // Fetch user profile using the token
        .then((user) => {
          setUser(user); // Set user state if profile is fetched successfully
        })
        .catch(() => {
          localStorage.removeItem('token'); // Remove invalid token if fetching fails
        })
        .finally(() => {
          setLoading(false); // Set loading to false after fetching completes
        });
    } else {
      setLoading(false); // No token, stop loading
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optionally render a loading state while fetching user
  }

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
