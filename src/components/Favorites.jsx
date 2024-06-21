import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

const Favorites = () => {
  const [favorites, setFavorites] = useState({});
  const [groupedFavorites, setGroupedFavorites] = useState({});
  const [sortOption, setSortOption] = useState('recent');

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    const updatedFavorites = addMissingDates(storedFavorites);
    setFavorites(updatedFavorites);
    groupAndSortFavorites(updatedFavorites, sortOption);
  }, [sortOption]);

  const addMissingDates = (favs) => {
    let updated = false;
    const updatedFavs = Object.entries(favs).reduce((acc, [key, value]) => {
      if (!value.addedAt) {
        updated = true;
        acc[key] = { ...value, addedAt: Date.now() };
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});

    if (updated) {
      localStorage.setItem('favorites', JSON.stringify(updatedFavs));
    }
    return updatedFavs;
  };

  const groupAndSortFavorites = (favs, option) => {
    const grouped = Object.entries(favs).reduce((acc, [episodeKey, episode]) => {
      const showKey = `${episode.showId}-${episode.seasonNumber}`;
      if (!acc[showKey]) {
        acc[showKey] = {
          showTitle: episode.showTitle,
          showId: episode.showId,
          seasonNumber: episode.seasonNumber,
          episodes: []
        };
      }
      acc[showKey].episodes.push({ ...episode, episodeKey });
      return acc;
    }, {});

    // Sort episodes within each show
    Object.values(grouped).forEach(show => {
      show.episodes.sort((a, b) => {
        switch (option) {
          case 'az':
            return a.title.localeCompare(b.title);
          case 'za':
            return b.title.localeCompare(a.title);
          case 'recent':
            return b.addedAt - a.addedAt;
          case 'oldest':
            return a.addedAt - b.addedAt;
          default:
            return 0;
        }
      });
    });

    // Sort shows
    const sortedGrouped = Object.entries(grouped).sort((a, b) => {
      switch (option) {
        case 'az':
          return a[1].showTitle.localeCompare(b[1].showTitle);
        case 'za':
          return b[1].showTitle.localeCompare(a[1].showTitle);
        case 'recent':
          return Math.max(...b[1].episodes.map(e => e.addedAt)) - Math.max(...a[1].episodes.map(e => e.addedAt));
        case 'oldest':
          return Math.min(...a[1].episodes.map(e => e.addedAt)) - Math.min(...b[1].episodes.map(e => e.addedAt));
        default:
          return 0;
      }
    });

    setGroupedFavorites(Object.fromEntries(sortedGrouped));
  };

  const removeFavorite = (episodeKey) => {
    const newFavorites = { ...favorites };
    delete newFavorites[episodeKey];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    groupAndSortFavorites(newFavorites, sortOption);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown date';
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-20">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Favorites</h1>
          <select
            className="bg-gray-800 text-white p-2 rounded"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="recent">Most Recently Updated</option>
            <option value="oldest">Furthest Back Updated</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>
        {Object.keys(favorites).length === 0 ? (
          <p>You haven't added any favorites yet.</p>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedFavorites).map(([showKey, show]) => (
              <div key={showKey} className="bg-gray-800 rounded-md p-6">
                <h2 className="text-2xl font-semibold mb-4">{show.showTitle} - Season {show.seasonNumber}</h2>
                <ul className="space-y-4">
                  {show.episodes.map((episode) => (
                    <li key={episode.episodeKey} className="bg-gray-700 rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-semibold">{episode.title}</h3>
                          <p className="text-gray-400">Episode {episode.episode}</p>
                          <p className="text-gray-500 text-sm">Added: {formatDate(episode.addedAt)}</p>
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() => removeFavorite(episode.episodeKey)}
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;