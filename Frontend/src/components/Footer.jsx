import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-10">
      <div className="max-w-7xl mx-auto px-6 text-white">
        {/* Company Description Section */}
        <div className="mb-8">
          <h5 className="text-lg font-semibold mb-2">About RideShare</h5>
          <p className="text-sm opacity-75">
            Your trusted partner for safe, reliable, and affordable rides. Join our community and
            experience the convenience of modern transportation.
          </p>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h5 className="text-lg font-semibold mb-2">Quick Links</h5>
            <ul className="space-y-1">
              <li>
                <a href="/about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="hover:underline">
                  Our Services
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-2">Legal</h5>
            <ul className="space-y-1">
              <li>
                <a href="/privacy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:underline">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-2">Stay Connected</h5>
            <form className="flex mb-4">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition">
                Subscribe
              </button>
            </form>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition">
                <FaFacebookF className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700 transition">
                <FaLinkedinIn className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Copyright Section */}
        <div className="text-center mt-6">
          <p className="text-sm opacity-60">© 2024 RideShare. All rights reserved.</p>
          <p className="text-sm opacity-60">
            <span className="mr-2">Follow us:</span>
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>{' '}
            |
            <a href="/terms" className="hover:underline">
              {' '}
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
