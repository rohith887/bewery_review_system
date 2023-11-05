import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/', { name, email, password });
      console.log(response.data); // Assuming the server sends back data

      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration failure, display an error message, etc.
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-300">
      <div className="w-full max-w-md p-8 space-y-8 rounded shadow-lg bg-yellow-50">
        <h2 className="text-3xl font-extrabold text-center text-yellow-900">Register</h2>
        {error && <p className="text-sm text-center text-red-500">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-yellow-900">
              Username
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full mt-1 border-2 border-gray-500 rounded-md shadow-sm outline-none focus:ring-2 focus:ring-yellow-400 f"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-yellow-900">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full mt-1 border-2 border-gray-500 rounded-md shadow-sm outline-non focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-yellow-900">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full mt-1 border-2 border-gray-500 rounded-md shadow-sm outline-non focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-yellow-600 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-200"
            >
              Register
            </button>
          </div>
        </form>
        <NavLink to="/login" className="flex justify-center text-center text-yellow-900">
          Already a user? Login
        </NavLink>
      </div>
    </div>
  );
};

export default Register;
