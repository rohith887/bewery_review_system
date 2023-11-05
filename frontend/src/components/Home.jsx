import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [breweries, setBreweries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const initialApiUrl = 'https://api.openbrewerydb.org/v1/breweries';

    axios.get(initialApiUrl)
      .then(response => {
        setBreweries(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);

    const apiUrl = `https://api.openbrewerydb.org/v1/breweries/search?query=${searchTerm}`;
    axios.get(apiUrl)
      .then(response => {
        setBreweries(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  return (
    <div className="container p-4 mx-auto bg-yellow-300 rounded-lg shadow-lg">
      <input
        type="text"
        placeholder="Search by city, name, or type"
        value={search}
        onChange={handleSearch}
        className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none"
      />
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-blue-700">Welcome to the Bewery Review System</h2>
        <p className="text-gray-600">
          Here you can find a list of breweries. Use the search bar above to filter breweries by city, name, or type.
        </p>
      </div>
      <h1 className="mb-4 text-3xl font-bold text-blue-900">Brewery List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {breweries.map(brewery => (
            <NavLink to={`brewery/${brewery.id}`} key={brewery.id} className="block">
              <div className="h-48 p-4 bg-white border border-gray-300 rounded-md">
                <div>
                  <h2 className="mb-2 text-xl font-semibold text-blue-900">{brewery.name}</h2>
                  <p className="mb-2">Address: {brewery.street}, {brewery.city}, {brewery.state} {brewery.postal_code}</p>
                  <p className="mb-2">Phone: {brewery.phone}</p>
                  <p className="mb-2">Website: <a href={brewery.website_url} className="text-blue-600">{brewery.website_url}</a></p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
