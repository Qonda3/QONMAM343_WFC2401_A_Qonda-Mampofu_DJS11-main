import React, { useState, useEffect } from 'react';
import './Carousel.css';
import Preview from './Preview';

const Carousel = () => {
  const [randomPreview, setRandomPreview] = useState(null);
  useEffect(() => {
    const fetchRandomPreviews = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app');
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        setRandomPreview(data[randomIndex]);
      } catch (error) {
        console.error('Error fetching random previews:', error);
      }
    };
    fetchRandomPreviews();
    const interval = setInterval(fetchRandomPreviews, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 rounded-md p-2 console-section">
      <div className="flex preview-container h-60">
        {randomPreview ? (
          <Preview
            imageUrl={randomPreview.image}
            className="mr-4 flex-shrink-0 h-12"
          />
        ) : (
          <p className="text-gray-400">Loading random preview...</p>
        )}
      </div>
    </div>
  )
};

export default Carousel;