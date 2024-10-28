import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FaCarSide, FaHeadset, FaRoute, FaMoneyBillWave, FaCar} from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { fetchUserProfile } from '../../api/auth'; // Assuming API method to fetch driver data
import { acceptRideRequest, getAvailableRideRequests, rejectRideRequest } from '../../api/rideAPI.js';

const DriverHomepage = () => {
  const [driverData, setDriverData] = useState(null);
  const [earnings, setEarnings] = useState(null); // Earnings summary
  const [rideRequests, setRideRequests] = useState([]); // Pending rides
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectedRide, setRejectedRide] = useState(null);

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        const profileData = await fetchUserProfile(token); // Fetch driver profile
        setDriverData(profileData);
      } catch (error) {
        console.error('Error fetching driver data:', error.message);
      }
    };

    fetchDriverData();
  }, []);

  useEffect(() => {
    const fetchRideRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const requests = await getAvailableRideRequests(token);
        console.log('Fetched ride requests:', requests);
        setRideRequests(requests);
      } catch (error) {
        console.error('Error fetching ride requests:', error.message);
      }
    };

    fetchRideRequests();
  }, []);


  useEffect(() => {
    console.log('Current ride requests state:', rideRequests); // Log state whenever it changes
  }, [rideRequests]);



  // Function to accept a ride
  const handleAcceptRide = async (rideId) => {
    try {
      const token = localStorage.getItem('token');
      await acceptRideRequest(rideId, token); // This should save the "Accepted" status in the backend.

      // Update state to reflect the accepted ride status
      setRideRequests((prevRequests) =>
        prevRequests.map((ride) => (ride._id === rideId ? { ...ride, status: 'Accepted' } : ride)),
      );
    } catch (error) {
      console.error('Error accepting ride:', error);
    }
  };


  // Function to reject a ride
  const handleRejectRide = async (rideId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await rejectRideRequest(rideId, token);
      console.log('Ride rejected:', response);
      // Optionally, update the UI after rejecting the ride
      // e.g., remove the ride from the list
      setRejectedRide(rideId);
      setShowRejectModal(true);
    } catch (error) {
      console.error('Failed to reject ride:', error);
    }
  };

  const confirmRejectRide = () => {
    if (rejectedRide) {
      // Update the state first (close modal, remove card)
      setRideRequests((prev) => prev.filter((ride) => ride._id !== rejectedRide));
      setShowRejectModal(false); // Close the modal

      // Now send the rejection request to the backend
      rejectRideRequest(rejectedRide)
        .then(() => {
          // Optionally handle the success response if needed
          setRejectedRide(null); // Reset the rejected ride
        })
        .catch((error) => {
          console.error('Error rejecting ride:', error);
          // Optionally handle error (e.g., add back the ride if the API request fails)
        });
    }
  };


  return (
    <IconContext.Provider value={{ color: '#3B82F6', size: '40px' }}>
      <div className="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <section id="home" className="relative w-full" style={{ height: 'calc(100vh/2)' }}>
          {/* Background Container */}
          <div className="w-full h-full relative">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-100"
              style={{
                backgroundImage: `url('/map1.jpg')`,
                minHeight: '100%',
                minWidth: '100%',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/40" />
          </div>

          {/* Content Container */}
          <div className="absolute inset-0">
            <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
              {/* Left Side - Welcome Text and Stats */}
              <div className="w-full lg:w-1/2">
                {driverData ? (
                  <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
                    Welcome back, <span className="text-blue-400">{driverData.name}</span>! 👋
                  </h1>
                ) : (
                  <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
                    Welcome back, Driver! 👋
                  </h1>
                )}
                <p className="mt-4 text-lg text-gray-300 max-w-xl">
                  Ready for another great day on the road? Your dashboard is ready with new
                  opportunities.
                </p>

                {/* Quick Stats */}
                <div className="mt-8 grid grid-cols-2 gap-4 max-w-lg">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center space-x-3">
                      <FaCar className="text-blue-400 w-6 h-6" />
                      <div>
                        <p className="text-white/70 text-sm">Available Rides</p>
                        <p className="text-white font-semibold text-xl">12</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center space-x-3">
                      <FaMoneyBillWave className="text-green-400 w-6 h-6" />
                      <div>
                        <p className="text-white/70 text-sm">Today's Earnings</p>
                        <p className="text-white font-semibold text-xl">$154.50</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={() =>
                      document
                        .getElementById('ride-requests')
                        .scrollIntoView({ behavior: 'smooth' })
                    }
                    className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg">
                    <FaCar className="mr-2" />
                    View Ride Requests
                  </button>
                  <button
                    onClick={() =>
                      document.getElementById('earnings').scrollIntoView({ behavior: 'smooth' })
                    }
                    className="flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/30 transition-all duration-200 backdrop-blur-sm">
                    <FaMoneyBillWave className="mr-2" />
                    Check Earnings
                  </button>
                </div>
              </div>

              {/* Right Side - Current Status Card */}
              <div className="hidden lg:block w-[400px]">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                      <span className="text-gray-600">Status</span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        Online
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                      <span className="text-gray-600">Today's Trips</span>
                      <span className="font-semibold text-gray-800">8 completed</span>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                      <span className="text-gray-600">Rating</span>
                      <span className="font-semibold text-gray-800">4.9 ⭐</span>
                    </div>
                    <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200">
                      Go Offline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ride Requests Section */}
        <section id='ride-requests' className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="max-w-7xl mx-auto px-4">
            {/* Header with animated underline */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 relative inline-block">
                Current Ride Requests
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
              </h2>
            </div>

            {rideRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rideRequests.map((ride) => (
                  <div
                    key={ride._id}
                    className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                    {/* Decorative top gradient bar */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 to-purple-400" />

                    <div className="p-6 pt-8">
                      {/* Passenger Info */}
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Passenger</p>
                          <p className="font-semibold text-gray-800">{ride.passenger.name}</p>
                        </div>
                      </div>

                      {/* Location Details */}
                      <div className="space-y-4 mb-6">
                        {/* Pickup Location */}
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center mt-1">
                            <svg
                              className="w-5 h-5 text-green-600"
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
                          <div className="flex-1">
                            <p className="text-sm text-gray-500">Pickup Location</p>
                            <p className="font-medium text-gray-800">{ride.pickupLocation}</p>
                          </div>
                        </div>

                        {/* Dropoff Location */}
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mt-1">
                            <svg
                              className="w-5 h-5 text-red-600"
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
                          <div className="flex-1">
                            <p className="text-sm text-gray-500">Dropoff Location</p>
                            <p className="font-medium text-gray-800">{ride.dropoffLocation}</p>
                          </div>
                        </div>
                      </div>

                      {/* Status and Actions */}
                      {ride.status === 'Accepted' ? (
                        <div className="bg-green-500 text-white py-2 px-4 rounded-lg text-center font-semibold">
                          Accepted
                        </div>
                      ) : (
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleAcceptRide(ride._id)}
                            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:-translate-y-0.5">
                            Accept
                          </button>
                          <button
                            onClick={() => handleRejectRide(ride._id)}
                            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:-translate-y-0.5">
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-xl text-gray-600 mb-2">No pending ride requests</p>
                <p className="text-gray-400">New requests will appear here when available</p>
              </div>
            )}

            {/* Reject Modal */}
            {showRejectModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4 transform transition-all">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Confirm Ride Rejection</h3>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to reject this ride request?
                  </p>
                  <div className="flex justify-end space-x-4">
                    <button
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                      onClick={() => setShowRejectModal(false)}>
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-colors font-medium"
                      onClick={confirmRejectRide}>
                      Confirm Reject
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Earnings Summary */}
        <section id="earnings" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Earnings Summary</h2>
            {earnings ? (
              <div className="flex flex-col items-center space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800">Daily Earnings</h3>
                  <p className="text-2xl font-bold text-blue-600">{earnings.daily}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800">Weekly Earnings</h3>
                  <p className="text-2xl font-bold text-blue-600">{earnings.weekly}</p>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-600">Earnings data is currently unavailable.</p>
            )}
          </div>
        </section>

        {/* Tools for Drivers */}
        <section id="tools" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Driver Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                <FaCarSide />
                <h3 className="text-lg font-bold mt-4 text-gray-800">Start Driving</h3>
                <p className="text-gray-600 mt-2">Start accepting rides and hit the road.</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                <FaRoute />
                <h3 className="text-lg font-bold mt-4 text-gray-800">Navigation</h3>
                <p className="text-gray-600 mt-2">Get directions to your next pickup location.</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                <FaHeadset />
                <h3 className="text-lg font-bold mt-4 text-gray-800">Customer Support</h3>
                <p className="text-gray-600 mt-2">Need help? Our support team is here 24/7.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Guidelines */}
        <section id="safety" className="py-16 bg-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
              Safety Guidelines
            </h2>
            <p className="text-center text-gray-600">
              Stay updated with the latest safety protocols and guidelines to ensure a safe and
              secure experience for both you and your passengers.
            </p>
            <div className="mt-6 flex justify-center">
              <a
                href="#"
                className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                View Safety Guidelines
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </IconContext.Provider>
  );
};

export default DriverHomepage;
