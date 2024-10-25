import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
  FaCarSide,
  FaHeadset,
  FaRoute,
} from 'react-icons/fa';
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
        <section
          id="home"
          className="relative flex-grow flex flex-col items-center justify-center pt-20 pb-20 bg-gradient-to-r from-blue-50 to-blue-200">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/map1.jpg')` }}></div>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 text-center px-6 py-20">
            {driverData ? (
              <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
                Welcome, {driverData.name}!
              </h1>
            ) : (
              <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
                Welcome, Driver!
              </h1>
            )}
            <p className="mt-4 text-lg md:text-xl text-gray-200">
              Ready for a smooth ride? Check your ride requests, track your earnings, and hit the
              road!
            </p>
            <div className="mt-6">
              <a
                href="#ride-requests"
                className="bg-white text-blue-600 py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105">
                Check Ride Requests
              </a>
              <a
                href="#earnings"
                className="ml-4 text-white border border-white py-3 px-6 rounded-lg hover:bg-gray-200 hover:text-blue-600 transition duration-300 transform hover:scale-105">
                View Earnings
              </a>
            </div>
          </div>
        </section>

        {/* Ride Requests Section */}
        <section id="ride-requests" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
              Current Ride Requests
            </h2>

            {rideRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {rideRequests.map((ride) => (
                  <div
                    key={ride._id}
                    className="bg-white p-5 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl">
                    {/* Passenger Name */}
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-semibold text-gray-800">Passenger:</h4>
                      <p className="text-lg font-medium text-gray-700 truncate">
                        {ride.passenger.name} {/* Access the passenger’s name */}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-semibold text-gray-800">Pickup:</h4>
                      <p className="text-lg font-medium text-gray-700 truncate">
                        {ride.pickupLocation}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-semibold text-gray-800">Dropoff:</h4>
                      <p className="text-lg font-medium text-gray-700 truncate">
                        {ride.dropoffLocation}
                      </p>
                    </div>

                    {ride.status === 'Accepted' ? (
                      <p className="text-center bg-green-500 text-white py-2 rounded-lg font-bold">
                        Accepted
                      </p>
                    ) : (
                      <div className="flex justify-center space-x-4 mt-4">
                        <button
                          className="bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition duration-200 transform hover:scale-105"
                          onClick={() => handleAcceptRide(ride._id)}>
                          <i className="fas fa-check"></i> Accept
                        </button>
                        <button
                          className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition duration-200 transform hover:scale-105"
                          onClick={() => handleRejectRide(ride._id)}>
                          <i className="fas fa-times"></i> Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 text-lg">
                No pending ride requests at the moment.
              </p>
            )}

            {/* Reject Modal */}
            {showRejectModal && (
              <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Confirm Ride Rejection</h3>
                  <p className="text-gray-700 mb-6">
                    Are you sure you want to reject this ride request?
                  </p>
                  <div className="flex justify-end space-x-4">
                    <button
                      className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                      onClick={() => setShowRejectModal(false)}>
                      Cancel
                    </button>
                    <button
                      className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
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
