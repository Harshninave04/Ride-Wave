import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FeatureCard from '../../components/FeatureCard';
import {
  FaShieldAlt,
  FaPumpSoap,
  FaIdBadge,
  FaMapMarkedAlt,
  FaHeadset,
  FaCreditCard,
  FaMoneyBillWave,
  FaBolt,
} from 'react-icons/fa';

import { IconContext } from 'react-icons';
import ServiceMap from '../../components/ServiceMap';

const Homepage = () => {
  return (
    <IconContext.Provider value={{ color: '#3B82F6', size: '40px' }}>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <section
          id="home"
          className="relative flex-grow flex flex-col items-center justify-center pt-20 pb-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/map1.jpg')` }}></div>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 text-center px-6 py-20">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
              Your Trusted Ride-sharing Partner
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200">
              Safe, Reliable, and Affordable Rides Anytime
            </p>
            <div className="mt-6">
              <a
                href="/signup"
                className="bg-white text-blue-600 py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105">
                Get Started
              </a>
              <a
                href="#features"
                className="ml-4 text-white border border-white py-3 px-6 rounded-lg hover:bg-gray-200 hover:text-blue-600 transition duration-300 transform hover:scale-105">
                Learn More
              </a>
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

        {/* Driver Profiles Section */}
        <section id="drivers" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
              Meet Our Top Drivers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <img
                  src="/shreya.jpg"
                  alt="Shreya"
                  className="w-24 h-24 mx-auto rounded-full object-contain"
                />
                <h3 className="text-lg font-bold mt-4 text-gray-900">Shreya Wagh</h3>
                <p className="text-gray-500">4.9 Rating (200 Rides)</p>
                <p className="mt-2 text-gray-600">
                  “I’ve been driving for RideShare for 3 years, and I love helping people get where
                  they need to go safely.”
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <img
                  src="/vite.svg"
                  alt=""
                  className="w-24 h-24 mx-auto rounded-full"
                />
                <h3 className="text-lg font-bold mt-4 text-gray-900">Ramesh Gutka</h3>
                <p className="text-gray-500">4.8 Rating (150 Rides)</p>
                <p className="mt-2 text-gray-600">
                  “Safe driving is my passion, and I love helping people reach their destinations
                  with peace of mind.”
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <img
                  src="/vite.svg"
                  alt=""
                  className="w-24 h-24 mx-auto rounded-full"
                />
                <h3 className="text-lg font-bold mt-4 text-gray-900">Kamla Pasand</h3>
                <p className="text-gray-500">5.0 Rating (300 Rides)</p>
                <p className="mt-2 text-gray-600">
                  “I’ve been a driver for RideShare for over 5 years and love ensuring the best
                  experience for every rider.”
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Why Trust Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Safety First */}
              <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md text-center">
                <FaShieldAlt />
                <h3 className="text-xl font-bold mt-4 text-gray-800">Safety First</h3>
                <p className="text-gray-600 mt-2">Drivers undergo background checks to ensure safety.</p>
              </div>

              {/* Sanitized Rides */}
              <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md text-center">
                <FaPumpSoap />
                <h3 className="text-xl font-bold mt-4 text-gray-800">Sanitized Rides</h3>
                <p className="text-gray-600 mt-2">Our cars are thoroughly sanitized for every ride.</p>
              </div>

              {/* Verified Drivers */}
              <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md text-center">
                <FaIdBadge />
                <h3 className="text-xl font-bold mt-4 text-gray-800">Verified Drivers</h3>
                <p className="text-gray-600 mt-2">All drivers are verified for your peace of mind.</p>
              </div>

              {/* Real-time Tracking */}
              <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md text-center">
                <FaMapMarkedAlt />
                <h3 className="text-xl font-bold mt-4 text-gray-800">Real-time Tracking</h3>
                <p className="text-gray-600 mt-2">Track your ride in real time with GPS.</p>
              </div>

              {/* 24/7 Support */}
              <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md text-center">
                <FaHeadset />
                <h3 className="text-xl font-bold mt-4 text-gray-800">24/7 Support</h3>
                <p className="text-gray-600 mt-2">Our support team is here to help anytime.</p>
              </div>

              {/* Cashless Payment */}
              <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md text-center">
                <FaCreditCard />
                <h3 className="text-xl font-bold mt-4 text-gray-800">Cashless Payment</h3>
                <p className="text-gray-600 mt-2">Pay seamlessly with cashless options.</p>
              </div>

              {/* Trusted Community */}
              {/* <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md text-center">
                <FaUsers />
                <h3 className="text-xl font-bold mt-4 text-gray-800">Trusted Community</h3>
                <p className="text-gray-600 mt-2">Join a community of thousands of trusted users.</p>
              </div> */}
            </div>
          </div>
        </section>

        {/* Map Section */}
        {/* <section id="service-map" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Service Areas</h2>
            <div className="w-full h-96 bg-gray-300 flex items-center justify-center">
              <FaMapMarkerAlt size={80} className="text-blue-600" />
              <p className="text-lg text-gray-600 ml-4">
                We're currently available in major cities across the country!
              </p>
            </div>
          </div>
        </section> */}
        <ServiceMap/>

        {/* CTA Section */}
        <section id="cta" className="py-16 bg-gray-200">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Start Your Journey?</h2>
            <p className="text-lg mb-6 text-gray-600">
              Join thousands of satisfied riders and drivers today.
            </p>
            <a
              href="/signup"
              className="bg-blue-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Sign Up Now
            </a>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </IconContext.Provider>
  );
};

export default Homepage;
