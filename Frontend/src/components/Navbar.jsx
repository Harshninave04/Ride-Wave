import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setShowLogoutModal(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Desktop and Mobile Layout */}
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-blue-600">
              RideShare
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
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
                    onClick={() => setShowLogoutModal(true)}
                    className="text-lg font-medium text-red-500 hover:text-red-600 transition duration-300 relative group">
                    Logout
                    <span className="absolute left-0 -bottom-1 w-full h-1 bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none">
                {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4 mt-4">
                {!user ? (
                  <>
                    <Link
                      to="/login"
                      className="text-gray-700 hover:text-blue-600 px-4 py-2"
                      onClick={() => setIsMenuOpen(false)}>
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="text-gray-700 hover:text-blue-600 px-4 py-2"
                      onClick={() => setIsMenuOpen(false)}>
                      Signup
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setShowLogoutModal(true);
                        setIsMenuOpen(false);
                      }}
                      className="text-left text-red-500 hover:text-red-600 px-4 py-2">
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
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
