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
        <section
          id="ride-request"
          className="py-16 bg-gradient-to-r from-blue-50 to-indigo-100 relative">
          {/* Decorative background circle */}
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-200 rounded-full opacity-30"></div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-400 rounded-full opacity-20"></div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
              Request a New Ride
            </h2>

            <div className="flex flex-col items-center space-y-4 bg-white shadow-lg rounded-lg p-8 md:p-12 max-w-lg mx-auto">
              <div className="w-full flex items-center relative">
                <span className="absolute left-3 text-gray-400">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <input
                  type="text"
                  placeholder="Pickup Location"
                  value={newRide.pickupLocation}
                  onChange={(e) => setNewRide({ ...newRide, pickupLocation: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>

              <div className="w-full flex items-center relative">
                <span className="absolute left-3 text-gray-400">
                  <i className="fas fa-map-pin"></i>
                </span>
                <input
                  type="text"
                  placeholder="Dropoff Location"
                  value={newRide.dropoffLocation}
                  onChange={(e) => setNewRide({ ...newRide, dropoffLocation: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>

              <button
                onClick={handleRideRequest}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
                Request Ride
              </button>

              {rideStatus && (
                <p className="mt-4 text-blue-600 text-center font-semibold">{rideStatus}</p>
              )}
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
