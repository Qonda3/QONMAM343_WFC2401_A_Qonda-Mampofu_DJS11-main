import React, { useState } from 'react';

const Navbar = ({ onSortChange, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('aToZ');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleSortChange = (event) => {
    const newSortOption = event.target.value;
    setSortOption(newSortOption);
    onSortChange(newSortOption);
  };

  return (
    <nav className="bg-gray-900 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex-1 flex justify-center items-center">
          <form onSubmit={handleSearchSubmit} className="flex items-center mr-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="px-3 py-1 rounded-l-full bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-white"
            />
            <button
              type="submit"
              className="bg-teal-500 text-white px-3 py-1 rounded-r-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            >
              Search
            </button>
          </form>
          <div className="relative">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="appearance-none bg-gray-700 border border-gray-600 text-white py-1 px-3 pr-8 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          >
            <option value="aToZ">A-Z</option>
            <option value="zToA">Z-A</option>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
