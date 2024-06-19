import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AudioPlayer from './AudioPlayer';

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

  useEffect(() => {
    const getShowDetails = async () => {
      const showData = await fetchShowDetails(id);
      console.log('showData:', showData); // Log the API response data
      setShow(showData);
    };
    getShowDetails();
  }, [id]);

  if (!show) {
    return <div>Loading...</div>;
  }

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const toggleSeasonEpisodes = (seasonIndex, episodeIndex) => {
    setExpandedSeason((prev) => (prev === seasonIndex ? null : seasonIndex));
    if (episodeIndex !== undefined) {
      setSelectedEpisode(show.seasons[seasonIndex].episodes[episodeIndex]);
    } else {
      setSelectedEpisode(null);
    }
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
                <div key={season.id} className="bg-gray-800 rounded-md p-4">
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
                      {expandedSeason === index ? '-' : '+'}
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
                              key={`${season.id}-${episodeIndex}`}
                              className="bg-gray-700 rounded-md p-2 cursor-pointer"
                              onClick={() => toggleSeasonEpisodes(index, episodeIndex)}
                            >
                              <h5 className="text-base font-medium">
                                {episode.title}
                              </h5>
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
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowDetails;
