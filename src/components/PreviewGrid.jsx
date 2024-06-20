import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Preview from './Preview';
import Carousel from './Carousel';
import { Link } from 'react-router-dom';

const fetchPreviews = async (genre = null) => {
  const url = 'https://podcast-api.netlify.app';
  const response = await fetch(url);
  const data = await response.json();

  // The API response is an array of previews
  const previews = data.map((show) => ({
    id: show.id,
    title: show.title,
    description: show.description,
    image: show.image,
    seasonsCount: show.seasons,
    lastUpdated: show.updated,
    genres: show.genres,
  }));

  // Filter previews based on the selected genre
  if (genre === null || genre === 0) {
    return previews; // Return all previews for the "All" genre
  } else {
    return previews.filter((preview) => preview.genres.includes(genre));
  }
};

const PreviewGrid = () => {
  const [previews, setPreviews] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0); // Default to "All" genre

  const genres = [
    { id: 0, name: 'All' },
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

  const handleGenreClick = (genreId) => {
    setActiveGenre(genreId);
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-4">
          {genres.map((genre) => (
            <button
              key={genre.id}
              className={`px-4 py-2 rounded-md mx-2 text-sm ${
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
                  seasonsCount={preview.seasonsCount}
                  lastUpdated={preview.lastUpdated}
                  genres={preview.genres} // Pass genres to the Preview component
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