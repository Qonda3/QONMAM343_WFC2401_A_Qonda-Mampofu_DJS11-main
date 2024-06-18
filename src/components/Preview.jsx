import React from 'react';

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

export default Preview;