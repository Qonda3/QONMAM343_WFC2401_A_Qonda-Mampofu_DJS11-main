import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Preview from './Preview';
import Carousel from './Carousel';
import { Link } from 'react-router-dom';

// Fetch function to get preview data
const fetchPreviews = async (genre = null) => {
  let url = 'https://podcast-api.netlify.app';
  if (genre) {
    url = `https://podcast-api.netlify.app/genre/${genre}`;
  }
  const response = await fetch(url);
  const shows = await response.json();

  const fetchShowDetails = async (id) => {
    const showUrl = `https://podcast-api.netlify.app/id/${id}`;
    const showResponse = await fetch(showUrl);
    const showData = await showResponse.json();
    return showData;
  };

  const previewsWithDetails = await Promise.all(
    shows.map(async (show) => {
      const showDetails = await fetchShowDetails(show.id);
      return {
        ...show,
        seasonsCount: showDetails.seasons.length,
        lastUpdated: showDetails.updated, // assuming the field is 'updated'
      };
    })
  );

  return previewsWithDetails;
};

const PreviewGrid = () => {
  const [previews, setPreviews] = useState([]);
  const [activeGenre, setActiveGenre] = useState(null);

  const genres = [
    { id: 1, name: 'Personal Growth' },
    { id: 2, name: 'Investigative Journalism' },
    { id: 3, name: 'History' },
    { id: 4, name: 'Comedy' },
    { id: 5, name: 'Entertainment' },
    { id: 6, name: 'Business' },
    { id: 7, name: 'Fiction' },
    { id: 8, name: 'News' },
    { id: 9, name: 'Kids and Family' },
  ];

  useEffect(() => {
    const getPreviews = async () => {
      const previewsData = await fetchPreviews(activeGenre);

      // Sort previews alphabetically by title
      const sortedPreviews = previewsData.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

      setPreviews(sortedPreviews);
    };

    getPreviews();
  }, [activeGenre]);

  const handleGenreClick = (genre) => {
    setActiveGenre(genre);
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-4">
          {genres.map((genre) => (
            <button
              key={genre.id}
              className={`px-4 py-2 rounded-md mx-2 ${
                activeGenre === genre.id
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => handleGenreClick(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </div>

        <Carousel />

        {previews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previews.map((preview) => (
              <Link key={preview.id} to={`/shows/${preview.id}`}>
                <Preview
                  imageUrl={preview.image}
                  title={preview.title}
                  description={preview.description}
                  seasonsCount={preview.seasonsCount} // Pass the number of seasons
                  lastUpdated={preview.lastUpdated} // Pass the last updated date
                />
              </Link>
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default PreviewGrid;