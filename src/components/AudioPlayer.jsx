import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart, faHeartBroken as solidHeart, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const AudioPlayer = ({ episode, seasonImage, shouldShowPlayer }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
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
    return null;
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
        <p className="text-gray-400">{episode.description}</p>
        <audio
          ref={audioRef}
          src={episode.file || 'https://via.placeholder.com/placeholder.mp3'}
          controls
          className="w-full mt-2"
        ></audio>
      </div>
      <div className="ml-4 flex items-center">
        <button
          onClick={toggleLike}
          className="text-gray-400 hover:text-red-500 focus:outline-none mr-4"
        >
          <FontAwesomeIcon icon={isLiked ? solidHeart : regularHeart} size="lg" />
        </button>
        <button
          onClick={togglePlay}
          className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 focus:outline-none"
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;