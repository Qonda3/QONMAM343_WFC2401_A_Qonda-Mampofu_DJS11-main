import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Perform search logic here
    console.log('Search term:', searchTerm);
  };

  return (
    <nav className="bg-gray-900 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex-1 flex justify-center">
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="px-3 py-1 rounded-full bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-coral-500 text-sm text-white"
            />
            <button
              type="submit"
              className="bg-coral-500 text-white px-3 py-1 rounded-full ml-2 hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-coral-500 text-sm"
            >
              Search
            </button>
          </form>
        </div>
        <div>
          {/* Additional navigation items can be added here */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

