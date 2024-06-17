import React, { useEffect, useState } from 'react';

// Fetch function to get preview data
const fetchPreviews = async () => {
  const response = await fetch('https://podcast-api.netlify.app');
  const data = await response.json();
  return data;
};

// Preview component
const Preview = ({ imageUrl, title }) => {
  return (
    <div className="border border-gray-300 rounded-md overflow-hidden text-center">
      <img src={imageUrl} alt={title} className="w-full h-auto" />
      <h3 className="p-4 text-lg">{title}</h3>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {previews.map((preview) => (
        <Preview key={preview.id} imageUrl={preview.image} title={preview.title} />
      ))}
    </div>
  );
};

export default PreviewGrid;