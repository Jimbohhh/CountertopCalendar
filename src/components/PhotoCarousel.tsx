import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Photo } from '../types';

interface PhotoCarouselProps {
  photos: Photo[];
  autoPlay?: boolean;
  interval?: number;
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({
  photos,
  autoPlay = true,
  interval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    if (!autoPlay || photos.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, photos.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  if (photos.length === 0) {
    return null;
  }

  const currentPhoto = photos[currentIndex];

  return (
    <>
      <div className="photo-carousel">
        <div className="carousel-container">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.caption || 'Photo'}
            className="carousel-image"
            onClick={() => setSelectedPhoto(currentPhoto)}
          />
          {photos.length > 1 && (
            <>
              <button onClick={handlePrevious} className="carousel-btn carousel-btn-left">
                <ChevronLeft size={24} />
              </button>
              <button onClick={handleNext} className="carousel-btn carousel-btn-right">
                <ChevronRight size={24} />
              </button>
              <div className="carousel-dots">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {selectedPhoto && (
        <div className="photo-modal" onClick={() => setSelectedPhoto(null)}>
          <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-photo-btn"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={24} />
            </button>
            <img src={selectedPhoto.url} alt={selectedPhoto.caption || 'Photo'} />
            {selectedPhoto.caption && (
              <div className="photo-caption">{selectedPhoto.caption}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoCarousel;
