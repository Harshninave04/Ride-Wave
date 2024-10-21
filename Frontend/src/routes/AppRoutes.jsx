// src/routes/AppRoutes.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from '../pages/prelogin/Homepage';
import Login from '../pages/prelogin/Login';
import Signup from '../pages/prelogin/Signup';
import ProtectedRoute from './ProtectedRoute';// Import ProtectedRoute
import PostLoginHomepage from '../pages/postlogin/PostLoginHomepage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={<ProtectedRoute><PostLoginHomepage/></ProtectedRoute>}
      />
    </Routes>
  );
};

export default AppRoutes;
