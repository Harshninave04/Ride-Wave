import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FeatureCard from '../../components/FeatureCard';
import { requestRide, viewRideStatus } from '../../api/rideAPI'; // Import API methods
import { FaShieldAlt, FaMoneyBillWave, FaBolt } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import ServiceMap from '../../components/ServiceMap';
import axios from 'axios';
import { fetchUserProfile } from '../../api/auth';

const PostLoginHomepage = () => {
  const [userData, setUserData] = useState(null);
  const [rideData, setRideData] = useState([]);
  const [newRide, setNewRide] = useState({ pickupLocation: '', dropoffLocation: '' });
  const [rideStatus, setRideStatus] = useState(null); // Store ride status

  // Fetch the user's profile information
 
useEffect(() => {
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const userData = await fetchUserProfile(token);
      setUserData(userData);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  fetchUserData();
}, []);

  // Fetch user's past rides and their statuses
  // useEffect(() => {
  //   const fetchRideData = async () => {
  //     try {
  //       const { data } = await axios.get('/api/rides/myrides', {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //         },
  //       });
  //       setRideData(data);
  //     } catch (error) {
  //       console.error('Error fetching ride data:', error);
  //     }
  //   };

  //   fetchRideData();
  // }, []);

  // Handle ride request submission
  const handleRideRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await requestRide(newRide.pickupLocation, newRide.dropoffLocation, token);
      setRideStatus('Ride Requested'); // Display feedback for request success
      console.log('Ride Requested:', response);
    } catch (error) {
      console.error('Error requesting ride:', error);
      setRideStatus('Ride Request Failed'); // Display error feedback
    }
  };

  // View ride status for a specific ride
  const handleViewRideStatus = async (rideId) => {
    try {
      const token = localStorage.getItem('token');
      const status = await viewRideStatus(rideId, token);
      console.log('Ride Status:', status);
      setRideStatus(status); // Update the ride status
    } catch (error) {
      console.error('Error fetching ride status:', error);
    }
  };

  return (
    <IconContext.Provider value={{ color: '#3B82F6', size: '40px' }}>
      <div className="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section - Personalized for Logged-in User */}
        <section
          id="home"
          className="relative flex-grow flex flex-col items-center justify-center pt-20 pb-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/map1.jpg')` }}></div>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 text-center px-6 py-20">
            {userData ? (
              <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
                Welcome, {userData.name}!
              </h1>
            ) : (
              <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
                Welcome to Your Dashboard!
              </h1>
            )}
            <p className="mt-4 text-lg md:text-xl text-gray-200">
              Manage your rides, explore features, and enjoy the journey!
            </p>
            <div className="mt-6">
              <a
                href="#ride-request"
                className="bg-white text-blue-600 py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105">
                Request a Ride
              </a>
              <a
                href="#features"
                className="ml-4 text-white border border-white py-3 px-6 rounded-lg hover:bg-gray-200 hover:text-blue-600 transition duration-300 transform hover:scale-105">
                Explore Features
              </a>
            </div>
          </div>
        </section>

        {/* Ride Request Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200 to-indigo-300 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />

          {/* Animated circles */}
          <div className="absolute left-1/4 top-1/4 w-4 h-4 bg-blue-400 rounded-full opacity-20 animate-pulse" />
          <div className="absolute right-1/3 bottom-1/3 w-6 h-6 bg-purple-400 rounded-full opacity-20 animate-pulse delay-300" />
          <div className="absolute left-2/3 top-1/2 w-3 h-3 bg-indigo-400 rounded-full opacity-20 animate-pulse delay-700" />

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            {/* Header with animated underline */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 relative inline-block">
                Request a New Ride
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Enter your pickup and dropoff locations to request a ride
              </p>
            </div>

            {/* Main Form Card */}
            <div className="max-w-lg mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 backdrop-blur-lg bg-opacity-80 relative overflow-hidden">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full filter blur-xl opacity-50 -translate-x-1/2 -translate-y-1/2" />

                <div className="space-y-6 relative">
                  {/* Pickup Location Input */}
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5">
                      <svg
                        className="w-full h-full text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter pickup location"
                      value={newRide.pickupLocation}
                      onChange={(e) => setNewRide({ ...newRide, pickupLocation: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                  </div>

                  {/* Dropoff Location Input */}
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5">
                      <svg
                        className="w-full h-full text-purple-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter dropoff location"
                      value={newRide.dropoffLocation}
                      onChange={(e) => setNewRide({ ...newRide, dropoffLocation: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300" />
                  </div>

                  {/* Request Button */}
                  <button
                    onClick={handleRideRequest}
                    className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Request Ride
                  </button>

                  {/* Status Message */}
                  {rideStatus && (
                    <div className="mt-4 py-3 px-4 bg-blue-50 border border-blue-100 rounded-lg">
                      <p className="text-blue-700 text-center font-medium">{rideStatus}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Extra Info Card */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">Need help? Contact our support team 24/7</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                title="Safety First"
                description="Our drivers go through rigorous background checks."
                icon={<FaShieldAlt />}
              />
              <FeatureCard
                title="Affordable Rides"
                description="We provide affordable rides with transparent pricing."
                icon={<FaMoneyBillWave />}
              />
              <FeatureCard
                title="Fast and Reliable"
                description="Reach your destination on time, every time."
                icon={<FaBolt />}
              />
            </div>
          </div>
        </section>

        {/* Ride History Section */}
        <section id="ride-history" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
              Your Recent Rides
            </h2>
            {rideData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {rideData.map((ride) => (
                  <div
                    key={ride._id}
                    className="bg-white p-6 rounded-lg shadow-lg text-center"
                    onClick={() => handleViewRideStatus(ride._id)} // View status on click
                  >
                    <h3 className="text-lg font-bold mt-4 text-gray-900">
                      Ride to {ride.dropoffLocation}
                    </h3>
                    <p className="text-gray-500">Status: {ride.status}</p>
                    <p className="mt-2 text-gray-600">Pickup: {ride.pickupLocation}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">No recent rides to show.</p>
            )}
          </div>
        </section>

        {/* Service Map */}
        <ServiceMap />

        {/* CTA Section */}
        <section id="cta" className="py-16 bg-gray-200">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready for Your Next Ride?</h2>
            <p className="text-lg mb-6 text-gray-600">Schedule your next ride with us today!</p>
            <a
              href="#ride-request"
              className="bg-blue-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Book a Ride Now
            </a>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </IconContext.Provider>
  );
};

export default PostLoginHomepage;
