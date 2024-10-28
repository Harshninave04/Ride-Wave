import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FeatureCard from '../../components/FeatureCard';
import ServiceMap from '../../components/ServiceMap';
import {
  FaShieldAlt,
  FaPumpSoap,
  FaIdBadge,
  FaMapMarkedAlt,
  FaHeadset,
  FaCreditCard,
  FaMoneyBillWave,
  FaBolt,
  FaQuoteLeft,
  FaStar,
  FaArrowRight,
  FaCarSide,
} from 'react-icons/fa';
import { IconContext } from 'react-icons';

const Homepage = () => {
  return (
    <IconContext.Provider value={{ color: '#3B82F6', size: '40px' }}>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />

        {/* Enhanced Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex flex-col items-center justify-center pt-20">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url('/map1.jpg')` }}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>

          {/* Animated content */}
          <div className="relative z-10 text-center px-6 py-20 max-w-4xl mx-auto">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
                Your Trusted
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                  {' '}
                  Ride-sharing{' '}
                </span>
                Partner
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-gray-200 leading-relaxed">
                Safe, Reliable, and Affordable Rides Anytime
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
                <a
                  href="/signup"
                  className="group relative px-8 py-4 bg-blue-600 text-white rounded-full overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 w-full md:w-auto">
                  <span className="relative z-10 flex items-center justify-center font-semibold">
                    Get Started{' '}
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </a>
                <a
                  href="#features"
                  className="group px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 w-full md:w-auto">
                  Learn More
                </a>
              </div>
            </div>

            {/* Floating stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {[
                { number: '10K+', label: 'Happy Riders' },
                { number: '5K+', label: 'Expert Drivers' },
                { number: '50+', label: 'Cities Covered' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 transform hover:-translate-y-2 transition-all duration-300">
                  <h3 className="text-3xl font-bold text-white">{stat.number}</h3>
                  <p className="text-gray-200">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section id="features" className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/30 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                title="Safety First"
                description="Our drivers undergo rigorous background checks and regular safety training."
                icon={
                  <FaShieldAlt className="text-blue-600 transform group-hover:scale-110 transition-transform duration-300" />
                }
              />
              <FeatureCard
                title="Affordable Rides"
                description="Competitive pricing with no hidden charges. Save more on every ride."
                icon={
                  <FaMoneyBillWave className="text-green-600 transform group-hover:scale-110 transition-transform duration-300" />
                }
              />
              <FeatureCard
                title="Fast & Reliable"
                description="Quick pickups and optimal routes to get you there on time, every time."
                icon={
                  <FaBolt className="text-yellow-600 transform group-hover:scale-110 transition-transform duration-300" />
                }
              />
            </div>
          </div>
        </section>

        {/* Enhanced Driver Profiles Section */}
        <section id="drivers" className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Top Drivers</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Dipak Lilhare',
                  rating: 4.9,
                  rides: 200,
                  quote:
                    "I've been driving for RideShare for 3 years, and I love helping people get where they need to go safely.",
                },
                {
                  name: 'Ramesh Gutka',
                  rating: 4.8,
                  rides: 150,
                  quote:
                    'Safe driving is my passion, and I love helping people reach their destinations with peace of mind.',
                },
                {
                  name: 'Kamla Pasand',
                  rating: 5.0,
                  rides: 300,
                  quote:
                    "I've been a driver for RideShare for over 5 years and love ensuring the best experience for every rider.",
                },
              ].map((driver, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative p-6">
                    <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-2 rounded-bl-2xl">
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 w-4 h-4 mr-1" />
                        <span>{driver.rating}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-1">
                        <img
                          src="/vite.svg"
                          alt={driver.name}
                          className="w-full h-full rounded-full object-cover bg-white"
                        />
                      </div>
                      <h3 className="text-xl font-bold mt-4 text-gray-900">{driver.name}</h3>
                      <p className="text-blue-600 font-medium">{driver.rides} Rides</p>
                      <FaQuoteLeft className="text-gray-200 mt-4 mb-2 w-8 h-8" />
                      <p className="text-gray-600 text-center italic">{driver.quote}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Safety Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Trust Us?</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaShieldAlt />,
                  title: 'Safety First',
                  desc: 'Rigorous background checks for all drivers',
                },
                {
                  icon: <FaPumpSoap />,
                  title: 'Sanitized Rides',
                  desc: 'Regular sanitization of all vehicles',
                },
                {
                  icon: <FaIdBadge />,
                  title: 'Verified Drivers',
                  desc: 'All drivers are verified professionals',
                },
                {
                  icon: <FaMapMarkedAlt />,
                  title: 'Real-time Tracking',
                  desc: 'Track your ride with live GPS',
                },
                {
                  icon: <FaHeadset />,
                  title: '24/7 Support',
                  desc: 'Round-the-clock customer assistance',
                },
                {
                  icon: <FaCreditCard />,
                  title: 'Secure Payments',
                  desc: 'Multiple secure payment options',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {React.cloneElement(item.icon, { className: 'text-blue-600 w-8 h-8' })}
                    </div>
                    <h3 className="text-xl font-bold mt-4 text-gray-900">{item.title}</h3>
                    <p className="mt-2 text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServiceMap />

        {/* Enhanced CTA Section */}
        <section
          id="cta"
          className="py-24 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute transform -rotate-45 -left-1/4 -top-1/4">
              <FaCarSide className="w-96 h-96 text-white" />
            </div>
          </div>
          <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 text-gray-200">
              Join thousands of satisfied riders and make every journey count.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a
                href="/signup"
                className="group relative px-8 py-4 bg-white text-blue-600 rounded-full overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 w-full md:w-auto">
                <span className="relative z-10 flex items-center justify-center font-semibold">
                  Sign Up Now{' '}
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </IconContext.Provider>
  );
};

export default Homepage;
