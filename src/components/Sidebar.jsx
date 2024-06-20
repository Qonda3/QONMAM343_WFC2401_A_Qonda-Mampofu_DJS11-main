import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Set default to closed

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`bg-gray-900 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex justify-end p-4">
        <button onClick={toggleSidebar} className="focus:outline-none">
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
    </div>
  );
};

export default Sidebar;
