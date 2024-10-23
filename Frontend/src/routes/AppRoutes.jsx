import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from '../pages/prelogin/Homepage';
import Login from '../pages/prelogin/Login';
import Signup from '../pages/prelogin/Signup';
import PostLoginHomepage from '../pages/postlogin/PostLoginHomepage';
import DriverHomepage from '../pages/postlogin/DriverHomepage'; // Import new DriverHomepage
import ProtectedRoute from './ProtectedRoute'; // Import ProtectedRoute

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <PostLoginHomepage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/driver-dashboard"
        element={
          <ProtectedRoute>
            <DriverHomepage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
