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
    <div style={previewStyle}>
      <img src={imageUrl} alt={title} style={imageStyle} />
      <h3 style={titleStyle}>{title}</h3>
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
    <div style={gridStyle}>
      {previews.map((preview) => (
        <Preview key={preview.id} imageUrl={preview.image} title={preview.title} />
      ))}
    </div>
  );
};

// CSS-in-JS styles
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '16px',
  padding: '20px',
};

const previewStyle = {
  border: '1px solid #ddd',
  borderRadius: '4px',
  overflow: 'hidden',
  textAlign: 'center',
};

const imageStyle = {
  width: '100%',
  height: 'auto',
};

const titleStyle = {
  padding: '10px',
  fontSize: '1.2em',
};

export default PreviewGrid;