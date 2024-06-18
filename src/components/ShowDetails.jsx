import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ShowDetails.css';  // Ensure you create this CSS file for styling

const fetchShowDetails = async (id) => {
  const url = `https://podcast-api.netlify.app/id/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    const getShowDetails = async () => {
      const showData = await fetchShowDetails(id);
      console.log('showData:', showData); // Log the API response data
      setShow(showData);
    };

    getShowDetails();
  }, [id]);

  if (!show) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="show-details-container">
      <div className="show-header">
        <img src={show.image} alt={show.title} className="show-image" />
        <div className="show-info">
          <h1 className="show-title">{show.title}</h1>
          <p className="show-description">{show.description}</p>
        </div>
      </div>

      {/* Render seasons */}
      {show.seasons && show.seasons.length > 0 && (
        <div className="seasons">
          {show.seasons.map((season) => (
            <div key={season.id} className="season">
              <h2 className="season-title">{season.title}</h2>
              {/* Render episodes */}
              {season.episodes && season.episodes.length > 0 && (
                <div className="episodes">
                  {season.episodes.map((episode, index) => (
                    <div key={`${season.id}-${index}`} className="episode">
                      <h4 className="episode-title">{episode.title}</h4>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowDetails;


