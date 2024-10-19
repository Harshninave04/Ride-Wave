// src/components/ServiceMap.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ServiceMap = () => {
  // Mock data for service areas and active drivers
  const serviceAreas = [
    { id: 1, name: 'Nagpur, Maharashtra', coords: [21.1458, 79.0882], demand: 'High' },
    { id: 2, name: 'Mumbai, Maharashtra', coords: [19.076, 72.8777], demand: 'High' },
    { id: 3, name: 'Pune, Maharashtra', coords: [18.5204, 73.8567], demand: 'Moderate' },
  ];

  const activeDrivers = [
    // Drivers in Nagpur
    {
      id: 1,
      name: 'Driver 1',
      coords: [21.15, 79.0892],
      rating: 4.5,
      vehicle: 'Sedan',
      available: true,
    },
    {
      id: 2,
      name: 'Driver 2',
      coords: [21.142, 79.08],
      rating: 4.7,
      vehicle: 'Hatchback',
      available: false,
    },
    {
      id: 3,
      name: 'Driver 3',
      coords: [21.155, 79.075],
      rating: 4.3,
      vehicle: 'SUV',
      available: true,
    },

    // Drivers in Mumbai
    {
      id: 4,
      name: 'Driver 4',
      coords: [19.0822, 72.8816],
      rating: 4.9,
      vehicle: 'Sedan',
      available: true,
    },
    {
      id: 5,
      name: 'Driver 5',
      coords: [19.0896, 72.8656],
      rating: 4.1,
      vehicle: 'Electric',
      available: true,
    },
    {
      id: 6,
      name: 'Driver 6',
      coords: [19.063, 72.8634],
      rating: 4.8,
      vehicle: 'SUV',
      available: false,
    },

    // Drivers in Pune
    {
      id: 7,
      name: 'Driver 7',
      coords: [18.5308, 73.847],
      rating: 4.6,
      vehicle: 'Sedan',
      available: true,
    },
    {
      id: 8,
      name: 'Driver 8',
      coords: [18.5167, 73.8553],
      rating: 4.4,
      vehicle: 'Mini',
      available: true,
    },

    // Other cities in Maharashtra
    {
      id: 9,
      name: 'Driver 9',
      coords: [20.0062, 73.7682], // Nashik
      rating: 4.2,
      vehicle: 'Sedan',
      available: false,
    },
    {
      id: 10,
      name: 'Driver 10',
      coords: [20.9355, 77.7523], // Akola
      rating: 4.0,
      vehicle: 'SUV',
      available: true,
    },
  ];




  return (
    <section className="py-16 bg-gray-100 z-0">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Our Service Area</h2>
        <p className="text-center text-gray-600 mb-6">
          We currently operate in the following regions. Book your ride in any of these cities.
        </p>

        {/* Map Container */}
        <div className="h-96 w-full rounded-lg overflow-hidden shadow-lg">
          <MapContainer center={[21.15, 79.0892]} zoom={4} className="h-full w-full">
            {/* TileLayer for map styling */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Service Area Markers */}
            {serviceAreas.map((area) => (
              <Marker key={area.id} position={area.coords}>
                <Popup>
                  {area.name} - Demand: {area.demand}
                </Popup>
              </Marker>
            ))}

            {/* Active Drivers */}
            {activeDrivers.map((driver) => (
              <Marker key={driver.id} position={driver.coords}>
                <Popup>
                  <div className="text-left">
                    <h3 className="text-lg font-bold">{driver.name}</h3>
                    <p>
                      <strong>Rating:</strong> {driver.rating} / 5
                    </p>
                    <p>
                      <strong>Vehicle Type:</strong> {driver.vehicle}
                    </p>
                    <p>
                      <strong>Status:</strong> {driver.available ? 'Available' : 'Not Available'}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="text-center mt-10">
          <a
            href="/signup"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
            Book a Ride
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServiceMap;
