import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AudioPlayer from './AudioPlayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart, faPlay } from '@fortawesome/free-solid-svg-icons';

const fetchShowDetails = async (id) => {
  const url = `https://podcast-api.netlify.app/id/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [expandedSeason, setExpandedSeason] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const getShowDetails = async () => {
      const showData = await fetchShowDetails(id);
      setShow(showData);
    };
    getShowDetails();

    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    setFavorites(storedFavorites);
  }, [id]);

  if (!show) {
    return <div>Loading...</div>;
  }

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const toggleSeasonEpisodes = (seasonIndex) => {
    setExpandedSeason((prev) => (prev === seasonIndex ? null : seasonIndex));
  };

  const selectEpisode = (seasonIndex, episodeIndex) => {
    setSelectedEpisode(show.seasons[seasonIndex].episodes[episodeIndex]);
    setIsPlaying(true);
  };

  const toggleFavorite = (episode, seasonNumber) => {
    const episodeKey = `${id}-${seasonNumber}-${episode.episode}`;
    const newFavorites = { ...favorites };
    
    if (newFavorites[episodeKey]) {
      delete newFavorites[episodeKey];
    } else {
      newFavorites[episodeKey] = {
        ...episode,
        showId: id,
        showTitle: show.title,
        seasonNumber
      };
    }
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const isEpisodeFavorite = (seasonNumber, episodeNumber) => {
    const episodeKey = `${id}-${seasonNumber}-${episodeNumber}`;
    return !!favorites[episodeKey];
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-20">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row mb-4">
          <img
            src={show.image}
            alt={show.title}
            className="w-80 h-80 mb-4 md:mb-0 md:mr-4 rounded-md"
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">{show.title}</h1>
            <p className={`mb-4 ${showFullDescription ? '' : 'line-clamp-4'}`}>
              {show.description}
            </p>
            {showFullDescription && (
              <div className="mt-4">
                <strong>Genres: </strong>{show.genres ? show.genres.join(', ') : 'N/A'}
                <br />
                <strong>Seasons: </strong>{show.seasons.length}
              </div>
            )}
            <button
              onClick={toggleDescription}
              className="text-teal-500 hover:text-teal-700 focus:outline-none"
            >
              {showFullDescription ? 'Show Less' : 'Show More'}
            </button>
          </div>
        </div>
        {show.seasons && show.seasons.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Seasons</h2>
            <div className="flex flex-col space-y-4">
              {show.seasons.map((season, index) => (
                <div key={season.season} className="bg-gray-800 rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <img
                        src={season.image}
                        alt={season.title}
                        className="w-32 h-auto rounded-md"
                      />
                      <div>
                        <h3 className="text-xl font-semibold">{season.title}</h3>
                        <p className="text-gray-400">
                          Episodes: {season.episodes.length}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSeasonEpisodes(index)}
                      className="text-teal-500 hover:text-teal-700 focus:outline-none"
                    >
                      <svg
                        className={`w-6 h-6 transform transition-transform ${
                          expandedSeason === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                                      </div>
                  {expandedSeason === index &&
                    season.episodes &&
                    season.episodes.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-lg font-medium mb-2">Episodes</h4>
                        <ul className="space-y-2">
                          {season.episodes.map((episode, episodeIndex) => (
                            <li
                              key={`${season.season}-${episode.episode}`}
                              className="bg-gray-700 rounded-md p-4 flex items-center justify-between cursor-pointer"
                              onClick={() => selectEpisode(index, episodeIndex)}
                            >
                              <div className="flex items-center space-x-4">
                                <div>
                                  <h5 className="text-base font-medium">
                                    {episode.title}
                                  </h5>
                                  <p className="text-gray-400 line-clamp-2">
                                    {episode.description}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(episode, season.season);
                                  }}
                                  className={`text-gray-400 hover:text-red-500 focus:outline-none mr-4 ${
                                    isEpisodeFavorite(season.season, episode.episode) ? 'text-red-500' : ''
                                  }`}
                                >
                                  <FontAwesomeIcon
                                    icon={isEpisodeFavorite(season.season, episode.episode) ? solidHeart : regularHeart}
                                    size="lg"
                                  />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    selectEpisode(index, episodeIndex);
                                  }}
                                  className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 focus:outline-none"
                                >
                                  <FontAwesomeIcon icon={faPlay} />
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedEpisode && (
          <div className="mt-8">
            <AudioPlayer
              episode={selectedEpisode}
              seasonImage={
                expandedSeason !== null
                  ? show.seasons[expandedSeason].image
                  : show.image
              }
              shouldShowPlayer={isPlaying}
              key={selectedEpisode.file}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowDetails;