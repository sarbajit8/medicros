import React from 'react';

const ImagePopup = ({ image, title, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="max-w-full max-h-[80vh] object-contain" // Set max height to 80% of the viewport height
        />
        <h2 className="text-white text-xl text-center mt-2">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ImagePopup;