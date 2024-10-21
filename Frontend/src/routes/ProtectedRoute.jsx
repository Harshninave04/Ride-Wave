import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // If the app is still fetching user info, show a loading screen
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a proper loading spinner
  }

  // If no user is logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user exists, render the children (protected components)
  return children;
};

export default ProtectedRoute;
