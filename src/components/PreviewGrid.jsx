import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Preview from './Preview';
import Carousel from './Carousel';

const fetchPreviews = async (genre = null) => {
  const url = 'https://podcast-api.netlify.app';
  const response = await fetch(url);
  const data = await response.json();

  const previews = data.map((show) => ({
    id: show.id,
    title: show.title,
    description: show.description,
    image: show.image,
    seasonsCount: show.seasons,
    lastUpdated: show.updated,
    genres: show.genres,
  }));

  if (genre === null || genre === 0) {
    return previews;
  } else {
    return previews.filter((preview) => preview.genres.includes(genre));
  }
};

const PreviewGrid = () => {
  const [previews, setPreviews] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);
  const [sortOption, setSortOption] = useState('aToZ');
  const [searchTerm, setSearchTerm] = useState('');

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
      setPreviews(previewsData);
    };
    getPreviews();
  }, [activeGenre]);

  const handleGenreClick = (genreId) => {
    setActiveGenre(genreId);
  };

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const sortPreviews = (previewsToSort, option) => {
    switch (option) {
      case 'aToZ':
        return [...previewsToSort].sort((a, b) => a.title.localeCompare(b.title));
      case 'zToA':
        return [...previewsToSort].sort((a, b) => b.title.localeCompare(a.title));
      case 'latest':
        return [...previewsToSort].sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
      case 'oldest':
        return [...previewsToSort].sort((a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated));
      default:
        return [...previewsToSort].sort((a, b) => a.title.localeCompare(b.title));
    }
  };

  const filteredAndSortedPreviews = useMemo(() => {
    let filtered = previews;
    if (searchTerm) {
      filtered = previews.filter(preview =>
        preview.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return sortPreviews(filtered, sortOption);
  }, [previews, searchTerm, sortOption]);

  return (
    <div className="bg-gray-900">
      <Navbar onSortChange={handleSortChange} onSearch={handleSearch} />
      <div className="flex flex-wrap justify-center">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className={`m-2 px-4 py-2 rounded ${
              activeGenre === genre.id ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
      <Carousel />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filteredAndSortedPreviews.length > 0 ? (
          filteredAndSortedPreviews.map((preview) => (
            <Link key={preview.id} to={`/show/${preview.id}`}>
              <Preview
                imageUrl={preview.image}
                title={preview.title}
                description={preview.description}
                seasonsCount={preview.seasonsCount}
                lastUpdated={preview.lastUpdated}
                genres={preview.genres}
              />
            </Link>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default PreviewGrid;
