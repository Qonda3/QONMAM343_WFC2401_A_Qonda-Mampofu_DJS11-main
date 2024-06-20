import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer = ({ episode, seasonImage, shouldShowPlayer }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (!shouldShowPlayer) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, [shouldShowPlayer]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [episode]);

  if (!shouldShowPlayer) {
    return null; // Don't render the AudioPlayer if shouldShowPlayer is false
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 py-4 px-6 flex items-center">
      <div className="mr-4">
        <img
          src={seasonImage || 'https://via.placeholder.com/150'}
          alt={episode.title}
          className="w-16 h-16 rounded-md"
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{episode.title}</h3>
        <audio
          ref={audioRef}
          src={episode.file || 'https://via.placeholder.com/placeholder.mp3'}
          controls
          className="w-full"
        ></audio>
      </div>
      <div>
        <button
          onClick={togglePlay}
          className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;