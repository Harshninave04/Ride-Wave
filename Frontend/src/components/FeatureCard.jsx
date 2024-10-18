import React from 'react';

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg text-center">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
