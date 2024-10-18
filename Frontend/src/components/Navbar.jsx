import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          RideShare
        </Link>
        <div className="flex space-x-6">
          <Link to="/login" className="text-gray-700 hover:text-blue-600">
            Login
          </Link>
          <Link to="/signup" className="text-gray-700 hover:text-blue-600">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
