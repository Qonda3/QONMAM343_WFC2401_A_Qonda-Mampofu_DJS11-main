import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row mb-4">
          <img src={show.image} alt={show.title} className="w-80 h-80 mb-4 md:mb-0 md:mr-4 rounded-md" />
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">{show.title}</h1>
            <p className={`mb-4 ${showFullDescription ? '' : 'line-clamp-4'}`}>
              {show.description}
            </p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {show.seasons.map((season) => (
                <div key={season.id} className="bg-gray-800 rounded-md p-4">
                  <img src={season.image} alt={season.title} className="w-full h-auto mb-2 rounded-md" />
                  <h3 className="text-xl font-semibold">{season.title}</h3>
                  <p className="text-gray-400">Episodes: {season.episodes.length}</p>
                  {/* Render episodes */}
                  {season.episodes && season.episodes.length > 0 && (
                    <div>
                      <h4 className="text-lg font-medium mt-2">Episodes</h4>
                      <ul className="list-disc pl-5">
                        {season.episodes.map((episode, index) => (
                          <li key={`${season.id}-${index}`} className="text-gray-300">{episode.title}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowDetails;



