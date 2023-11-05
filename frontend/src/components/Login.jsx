import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Perform validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    axios.post('http://localhost:3001/login', { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          navigate('/home');
        }
      })
      .catch((err) => {
        console.log(err);
        setError('Invalid credentials. Please try again.');
      });

    setError('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-300">
      <div className="w-full max-w-md p-8 space-y-8 rounded shadow-lg bg-yellow-50">
        <h2 className="text-3xl font-extrabold text-center text-yellow-800">Log In</h2>
        {error && <p className="text-sm text-center text-red-500">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
              className="block w-full mt-1 border rounded-md shadow-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full mt-1 border rounded-md shadow-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-yellow-600 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-200"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
