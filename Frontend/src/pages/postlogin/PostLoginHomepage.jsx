import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FeatureCard from '../../components/FeatureCard';
import { requestRide, viewRideStatus } from '../../api/rideAPI';
import { FaShieldAlt, FaMoneyBillWave, FaBolt, FaMapMarkerAlt, FaLocationArrow } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import ServiceMap from '../../components/ServiceMap';
import { fetchUserProfile } from '../../api/auth';

const PostLoginHomepage = () => {
  const [userData, setUserData] = useState(null);
  const [rideData, setRideData] = useState([]);
  const [newRide, setNewRide] = useState({ pickupLocation: '', dropoffLocation: '' });
  const [rideStatus, setRideStatus] = useState(null);
  const [isRequesting, setIsRequesting] = useState(false);

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

  const handleRideRequest = async () => {
    try {
      setIsRequesting(true);
      const token = localStorage.getItem('token');
      const response = await requestRide(newRide.pickupLocation, newRide.dropoffLocation, token);
      setRideStatus('🚗 Searching for nearby drivers...');
    } catch (error) {
      setRideStatus('❌ Ride Request Failed');
    } finally {
      setIsRequesting(false);
    }
  };

  const handleViewRideStatus = async (rideId) => {
    try {
      const token = localStorage.getItem('token');
      const status = await viewRideStatus(rideId, token);
      setRideStatus(status);
    } catch (error) {
      console.error('Error fetching ride status:', error);
    }
  };

  return (
    <IconContext.Provider value={{ color: '#3B82F6', size: '40px' }}>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />

        {/* Hero Section with Dynamic Background */}
        <section className="relative min-h-[800px] h-screen max-h-[1000px] w-full overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img src="/map1.jpg" alt="Map background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content Container */}
          <div className="relative h-full w-full flex flex-col items-center justify-center px-4 py-8">
            <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
              {/* Hero Text */}
              <div className="text-center w-full mb-8 sm:mb-10">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-4 tracking-tight px-4">
                  <span className="bg-gradient-to-r from-white to-orange-400 text-transparent bg-clip-text drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    {userData ? (
                      <>Hello, {userData.name.split(' ')[0]}! 👋</>
                    ) : (
                      <>Welcome Back! 👋</>
                    )}
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto font-normal drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] px-4">
                  Your journey begins here. Where would you like to go today?
                </p>
              </div>

              {/* Ride Request Card */}
              <div className="w-full max-w-md px-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8">
                  <div className="space-y-4 sm:space-y-6">
                    {/* Pickup Location */}
                    <div className="relative group">
                      <FaLocationArrow
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500"
                        size={20}
                      />
                      <input
                        type="text"
                        placeholder="Enter pickup location"
                        value={newRide.pickupLocation}
                        onChange={(e) => setNewRide({ ...newRide, pickupLocation: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 sm:py-4 bg-gray-50 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                      />
                    </div>

                    {/* Dropoff Location */}
                    <div className="relative group">
                      <FaMapMarkerAlt
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500"
                        size={20}
                      />
                      <input
                        type="text"
                        placeholder="Enter destination"
                        value={newRide.dropoffLocation}
                        onChange={(e) =>
                          setNewRide({ ...newRide, dropoffLocation: e.target.value })
                        }
                        className="w-full pl-12 pr-4 py-3 sm:py-4 bg-gray-50 rounded-xl border-2 border-gray-100 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200"
                      />
                    </div>

                    {/* Request Button */}
                    <button
                      onClick={handleRideRequest}
                      disabled={isRequesting}
                      className="w-full py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg">
                      {isRequesting ? (
                        <span className="flex items-center justify-center space-x-2">
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Finding your ride...</span>
                        </span>
                      ) : (
                        'Request Ride'
                      )}
                    </button>

                    {/* Status Message */}
                    {rideStatus && (
                      <div className="mt-4 py-3 px-4 bg-green-50 border border-green-100 rounded-xl">
                        <p className="text-green-700 text-center font-medium">
                          Ride requested! A driver will be assigned shortly.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section with hover animations */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Experience Premium Rides</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <FaShieldAlt className="text-blue-500" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-4">Safety First</h3>
                <p className="text-gray-600">
                  Verified drivers, real-time tracking, and 24/7 support for your peace of mind.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <FaMoneyBillWave className="text-green-500" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-4">Best Rates</h3>
                <p className="text-gray-600">
                  Competitive pricing with no hidden charges. Pay only for what you ride.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <FaBolt className="text-purple-500" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-4">Lightning Fast</h3>
                <p className="text-gray-600">
                  Quick driver assignment and optimal routes for timely arrivals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Rides Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Recent Rides</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            {rideData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rideData.map((ride) => (
                  <div
                    key={ride._id}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    onClick={() => handleViewRideStatus(ride._id)}>
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <FaLocationArrow className="text-blue-500" size={20} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Ride to {ride.dropoffLocation}
                        </h3>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500">From: {ride.pickupLocation}</p>
                          <div
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                              ride.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : ride.status === 'ongoing'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                            {ride.status}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaLocationArrow className="text-gray-400" size={24} />
                </div>
                <p className="text-gray-600">No recent rides to show.</p>
                <button
                  onClick={() =>
                    document.getElementById('ride-request').scrollIntoView({ behavior: 'smooth' })
                  }
                  className="mt-4 text-blue-500 hover:text-blue-600 font-medium">
                  Book your first ride →
                </button>
              </div>
            )}
          </div>
        </section>

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
}

export default PostLoginHomepage;
