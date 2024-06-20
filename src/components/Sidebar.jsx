import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faAngleDoubleLeft, faAngleDoubleRight, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Set default to closed

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div className={`bg-gray-900 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} min-h-screen`}>
      <div className="flex flex-col items-center py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center mb-6">
          <svg
            className="text-white h-10 w-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
          </svg>
          <span className={`${isOpen ? 'block' : 'hidden'} text-xl font-bold ml-2`}>PlayPress</span>
        </NavLink>
        <button onClick={toggleSidebar} className="focus:outline-none mb-4">
          <FontAwesomeIcon icon={isOpen ? faAngleDoubleLeft : faAngleDoubleRight} className="text-teal-500" />
        </button>
      </div>
      <nav>
        <ul className="space-y-2 px-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center py-2 px-4 rounded-md ${isActive ? 'bg-teal-500' : 'hover:bg-gray-700'}`
              }
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              <span className={`${isOpen ? 'block' : 'hidden'}`}>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `flex items-center py-2 px-4 rounded-md ${isActive ? 'bg-teal-500' : 'hover:bg-gray-700'}`
              }
            >
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              <span className={`${isOpen ? 'block' : 'hidden'}`}>Favorites</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="mt-auto ml-2 mr-1">
        <button
          onClick={handleLogout}
          className="flex items-center w-full bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mt-4"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          <span className={`${isOpen ? 'block' : 'hidden'}`}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

