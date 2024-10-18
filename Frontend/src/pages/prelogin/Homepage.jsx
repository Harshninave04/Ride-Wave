import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FeatureCard from '../../components/FeatureCard';
import { FaShieldAlt, FaMoneyBillWave, FaBolt, FaArrowRight } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const Homepage = () => {
  return (
    <IconContext.Provider value={{ color: '#3B82F6', size: '60px' }}>
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
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg animate-fadeInUp">
              Your Trusted Ride-sharing Partner
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200 animate-fadeInUp delay-150">
              Safe, Reliable, and Affordable Rides Anytime
            </p>
            <div className="mt-6 animate-fadeInUp delay-300">
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
                icon={<FaShieldAlt size={40} />}
              />
              <FeatureCard
                title="Affordable Rides"
                description="We provide affordable rides with transparent pricing."
                icon={<FaMoneyBillWave size={40} />}
              />
              <FeatureCard
                title="Fast and Reliable"
                description="Reach your destination on time, every time."
                icon={<FaBolt size={40} />}
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
              What Our Riders Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <p className="text-gray-700">
                  "Amazing service! Always on time and very professional drivers."
                </p>
                <div className="mt-4 flex items-center">
                  <img src="/vite.svg" alt="User" className="w-12 h-12 rounded-full" />
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900">John Doe</h3>
                    <p className="text-gray-500">Rider</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <p className="text-gray-700">
                  "Affordable and reliable, highly recommend this ride-sharing service!"
                </p>
                <div className="mt-4 flex items-center">
                  <img src="/vite.svg" alt="User" className="w-12 h-12 rounded-full" />
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900">Jane Smith</h3>
                    <p className="text-gray-500">Rider</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <p className="text-gray-700">
                  "I’ve been using this for months, never had any issues!"
                </p>
                <div className="mt-4 flex items-center">
                  <img src="/vite.svg" alt="User" className="w-12 h-12 rounded-full" />
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900">Michael Johnson</h3>
                    <p className="text-gray-500">Driver</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action (CTA) Section */}
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
