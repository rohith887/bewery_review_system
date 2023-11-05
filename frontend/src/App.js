import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import BreweryDetail from './components/BreweryDetail';
import Login from './components/Login';
import Register from './components/Register';
import Rating from './components/Rating';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home/brewery/:id" element={<BreweryDetail />} />
        <Route path="/home/brewery/:id/rating" element={<Rating />} />
      </Routes>
    </Router>
  );
};

export default App;
