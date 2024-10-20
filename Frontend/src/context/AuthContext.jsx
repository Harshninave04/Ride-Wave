// src/context/AuthContext.jsx

import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store the current user's information

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
