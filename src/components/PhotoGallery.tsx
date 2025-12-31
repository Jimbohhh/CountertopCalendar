import React, { useState, useRef } from 'react';
import { Upload, X, Trash2, Image as ImageIcon } from 'lucide-react';
import type { Photo } from '../types';

interface PhotoGalleryProps {
  photos: Photo[];
  onAddPhoto: (photo: Photo) => void;
  onDeletePhoto: (id: string) => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  onAddPhoto,
  onDeletePhoto,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        const photo: Photo = {
          id: Date.now().toString() + Math.random(),
          url,
          thumbnail: url,
          uploadedAt: new Date(),
        };
        onAddPhoto(photo);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  return (
    <div className="photo-gallery-container">
      <div className="gallery-header">
        <h2>Photo Gallery</h2>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="upload-btn"
        >
          <Upload size={20} />
          Upload Photos
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </div>

      {photos.length === 0 ? (
        <div className="empty-gallery">
          <ImageIcon size={48} />
          <p>No photos yet</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="upload-first-btn"
          >
            Upload your first photo
          </button>
        </div>
      ) : (
        <div className="photo-grid">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="photo-card"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img src={photo.thumbnail} alt={photo.caption || 'Photo'} />
              <button
                className="delete-photo-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeletePhoto(photo.id);
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

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
    </div>
  );
};

export default PhotoGallery;
