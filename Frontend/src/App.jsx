import React from 'react';
import AppRoutes from './routes/AppRoutes'; // Import the routing logic
import './index.css'; // Tailwind styles

function App() {
  return (
    <div className="App">
      {/* Using AppRoutes to handle all routing */}
      <AppRoutes />
    </div>
  );
}

export default App;
