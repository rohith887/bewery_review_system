import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';

const BreweryDetail = () => {
  const [brewery, setBrewery] = useState(null);
  const [reviews, setReviews] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    // Fetch brewery details
    axios.get(`https://api.openbrewerydb.org/v1/breweries/${id}`)
      .then(response => {
        setBrewery(response.data);
      })
      .catch(error => {
        console.error('Error fetching brewery data:', error);
      });

    // Fetch reviews for the brewery from your backend
    axios.get(`http://localhost:3001/home/brewery/${id}/rating`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, [id]);

  if (!brewery) {
    return <div className="mt-8 text-2xl text-center text-yellow-700">Loading...</div>;
  }

  return (
    <div className="container relative p-4 mx-auto bg-yellow-300 rounded-lg shadow-lg">
      <NavLink to={`/home/brewery/${id}/rating`} className="absolute px-4 py-2 font-bold text-white bg-yellow-500 rounded top-4 right-4 hover:bg-yellow-600">
        Rate
      </NavLink>
      <h2 className="mb-4 text-3xl font-bold text-yellow-800">{brewery.name}</h2>
      <p className="mb-2 text-lg text-yellow-800">Address: {brewery.street}, {brewery.city}, {brewery.state} {brewery.postal_code}</p>
      <p className="mb-2 text-lg text-yellow-800">Phone: {brewery.phone}</p>
      <p className="mb-4 text-lg text-yellow-800">Website: <a href={brewery.website_url} className="text-blue-600">{brewery.website_url}</a></p>

      <div className="mb-4 text-yellow-900">
        <h3 className="mb-2 text-2xl font-bold">Reviews and Ratings:</h3>
        {reviews.map((review, index) => (
          <div key={index} className="pb-4 mb-4 border-b-2 border-yellow-400">
            <p className="mb-2 text-lg">Rating: {review.rating}</p>
            <p className="mb-2 text-lg">Review: {review.review}</p>
          </div>
        ))}
      </div>

      <NavLink to="/" className="block w-32 mx-auto mt-4">
        <button className="px-4 py-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-600">
          Go back
        </button>
      </NavLink>
    </div>
  );
};

export default BreweryDetail;
