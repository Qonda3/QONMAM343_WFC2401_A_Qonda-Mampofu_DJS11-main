import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Carousel.css';

const Carousel = () => {
  const [randomPreview, setRandomPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRandomPreviews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://podcast-api.netlify.app');
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        setRandomPreview(data[randomIndex]);
      } catch (error) {
        console.error('Error fetching random previews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRandomPreviews();
    const interval = setInterval(fetchRandomPreviews, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-700 to-indigo-800 rounded-lg p-6 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-4">Featured Podcast</h2>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center h-60"
          >
            <div className="loader"></div>
          </motion.div>
        ) : randomPreview ? (
          <motion.div
            key={randomPreview.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex items-center bg-white bg-opacity-10 rounded-lg p-4"
          >
            <img
              src={randomPreview.image}
              alt={randomPreview.title}
              className="w-40 h-40 object-cover rounded-md mr-6 shadow-lg"
            />
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">{randomPreview.title}</h3>
              <p className="text-gray-300 mb-4 line-clamp-3">{randomPreview.description}</p>
              <div className="flex space-x-2">
                {randomPreview.genres.slice(0, 3).map((genre, index) => (
                  <span key={index} className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.p
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-gray-300"
          >
            No preview available
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Carousel;