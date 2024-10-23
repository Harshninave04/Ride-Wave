import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/auth'; // Assumes an API call function for logging in exists
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // For displaying login errors
  const { setUser } = useContext(AuthContext); // Assuming AuthContext manages user state
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    setError(''); // Clear previous errors before new attempt

    try {
      const response = await login(email, password); // API call for login
      const { token, user } = response; // Assuming response contains a token and user details

      // Store the token in localStorage (or cookies)
      localStorage.setItem('token', token);

      // Update the user in global state/context
      setUser(user);

      // Check user role and redirect accordingly
      if (user.role === 'driver') {
        navigate('/driver-dashboard'); // Redirect to driver dashboard
      } else if (user.role === 'rider') {
        navigate('/rider-dashboard'); // Redirect to rider dashboard
      } else {
        navigate('/home'); // Fallback to general dashboard if role is undefined
      }
    } catch (err) {
      // Display an error if the login fails (wrong credentials, etc.)
      setError('Login failed. Please check your email or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Display error message if login fails */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Login form */}
        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          {/* Password field */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            Login
          </button>
        </form>

        {/* Link to Signup page */}
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
