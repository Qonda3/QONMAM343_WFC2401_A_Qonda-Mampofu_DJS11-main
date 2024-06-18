import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Preview from './Preview';

// Fetch function to get preview data
const fetchPreviews = async (genre = null) => {
  let url = 'https://podcast-api.netlify.app';
  if (genre) {
    url = `https://podcast-api.netlify.app/genre/${genre}`;
  }
  const response = await fetch(url);
  const data = await response.json();
  return data;
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
      setPreviews(previewsData);
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
        {/* Explore section with genre buttons */}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {previews.map((preview) => (
            <Preview
              key={preview.id}
              imageUrl={preview.image}
              title={preview.title}
              description={preview.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewGrid;