import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

const Favorites = () => {
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (episodeKey) => {
    const newFavorites = { ...favorites };
    delete newFavorites[episodeKey];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-20">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">Favorites</h1>
        {Object.keys(favorites).length === 0 ? (
          <p>You haven't added any favorites yet.</p>
        ) : (
          <ul className="space-y-4">
            {Object.entries(favorites).map(([episodeKey, episode]) => (
              <li key={episodeKey} className="bg-gray-800 rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{episode.title}</h2>
                    <p className="text-gray-400">{episode.showTitle} - Season {episode.seasonNumber}, Episode {episode.episode}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => removeFavorite(episodeKey)}
                      className="text-red-500 hover:text-red-700 focus:outline-none mr-4"
                    >
                      <FontAwesomeIcon icon={solidHeart} size="lg" />
                    </button>
                    <Link
                      to={`/show/${episode.showId}`}
                      className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 focus:outline-none"
                    >
                      Go to Show
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Favorites;