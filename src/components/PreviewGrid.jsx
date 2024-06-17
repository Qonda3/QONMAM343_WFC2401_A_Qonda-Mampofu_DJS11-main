import React, { useEffect, useState } from 'react';

// Fetch function to get preview data
const fetchPreviews = async () => {
  const response = await fetch('https://podcast-api.netlify.app');
  const data = await response.json();
  return data;
};

// Preview component
const Preview = ({ imageUrl, title, description }) => {
  return (
    <div className="bg-gray-800 border border-teal-500 rounded-md overflow-hidden text-center">
      <img src={imageUrl} alt={title} className="w-full h-auto" />
      <div className="p-4">
        <h3 className="text-lg text-teal-500">{title}</h3>
        <p className="text-gray-300 line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

// PreviewGrid component
const PreviewGrid = () => {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const getPreviews = async () => {
      const previewsData = await fetchPreviews();
      setPreviews(previewsData);
    };

    getPreviews();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
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