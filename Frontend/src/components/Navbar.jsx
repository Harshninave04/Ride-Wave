import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Modal visibility state
  const navigate = useNavigate();

  const handleLogout = () => {    
  localStorage.removeItem('token'); // Clear the token from localStorage
  setUser(null); // Clear the user state in context
    setShowLogoutModal(false); // Close the modal
    navigate("/");
};

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            RideShare
          </Link>
          <div className="flex items-center space-x-8">
            {!user ? (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link to="/signup" className="text-gray-700 hover:text-blue-600">
                  Signup
                </Link>
              </>
            ) : (
              <>
                <div className="bg-gray-200 py-3 px-5 rounded-full">
                  <span className="text-lg font-normal text-black">
                    Welcome, <span className="font-bold">{user.name}</span>
                  </span>
                </div>
                <button
                  onClick={() => setShowLogoutModal(true)} // Show the modal on logout button click
                  className="text-lg font-medium text-red-500 hover:text-red-600 transition duration-300 relative group">
                  Logout
                  <span className="absolute left-0 -bottom-1 w-full h-1 bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Modal for Logout Confirmation */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)} // Close the modal without logging out
                className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
