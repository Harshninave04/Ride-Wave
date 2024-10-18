import React from 'react';

const Footer = () => {
  return (
    <footer className="py-6">
      <div className="max-w-7xl mx-auto px-4 text-center text-black">
        <p>© 2024 RideShare. All rights reserved.</p>
        <p className="mt-2">
          <a href="/privacy" className="text-blue-400 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
