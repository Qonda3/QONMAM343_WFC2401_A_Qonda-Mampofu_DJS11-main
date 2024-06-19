import React from 'react';

const Preview = ({ imageUrl, title, description, seasonsCount, lastUpdated, genres }) => {
  const formattedDate = new Date(lastUpdated).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-gray-800 border border-teal-500 rounded-md overflow-hidden text-center">
      <img src={imageUrl} alt={title} className="w-full h-auto" />
      <div className="p-4">
        <h3 className="text-lg text-teal-500">{title}</h3>
        <p className="text-gray-300 line-clamp-2">{description}</p>
        {genres && genres.length > 0 && (
          <p className="text-gray-400">Genres: {genres.join(', ')}</p>
        )}
        <p className="text-gray-400">Seasons: {seasonsCount}</p>
        <p className="text-gray-400">Last updated: {formattedDate}</p>
      </div>
    </div>
  );
};

export default Preview;
