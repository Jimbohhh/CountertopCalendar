import React, { useState } from 'react';
import { StickyNote as StickyNoteIcon, Image as ImageIcon } from 'lucide-react';
import Calendar from './Calendar';
import StickyNotesSidebar from './StickyNotesSidebar';
import PhotoCarousel from './PhotoCarousel';
import type { CalendarEvent, StickyNote, Photo } from '../types';

interface DashboardProps {
  events: CalendarEvent[];
  notes: StickyNote[];
  photos: Photo[];
  onAddEvent: (event: CalendarEvent) => void;
  onUpdateEvent: (event: CalendarEvent) => void;
  onDeleteEvent: (id: string) => void;
  onAddNote: (note: StickyNote) => void;
  onUpdateNote: (note: StickyNote) => void;
  onDeleteNote: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  events,
  notes,
  photos,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
}) => {
  const [showNotes, setShowNotes] = useState(true);
  const [showPhotos, setShowPhotos] = useState(true);

  return (
    <div className="dashboard">
      <div className="dashboard-controls">
        <button
          onClick={() => setShowPhotos(!showPhotos)}
          className={`dashboard-toggle-btn ${showPhotos ? 'active' : ''}`}
          title={showPhotos ? 'Hide Photos' : 'Show Photos'}
        >
          <ImageIcon size={18} />
          {showPhotos ? 'Hide' : 'Show'} Photos
        </button>
        <button
          onClick={() => setShowNotes(!showNotes)}
          className={`dashboard-toggle-btn ${showNotes ? 'active' : ''}`}
          title={showNotes ? 'Hide Notes' : 'Show Notes'}
        >
          <StickyNoteIcon size={18} />
          {showNotes ? 'Hide' : 'Show'} Notes
        </button>
      </div>

      <div className={`dashboard-layout ${showNotes ? 'with-sidebar' : ''}`}>
        <div className="dashboard-main">
          {showPhotos && photos.length > 0 && (
            <div className="dashboard-photos">
              <PhotoCarousel photos={photos} autoPlay={true} interval={5000} />
            </div>
          )}

          <div className="dashboard-calendar">
            <Calendar
              events={events}
              onAddEvent={onAddEvent}
              onUpdateEvent={onUpdateEvent}
              onDeleteEvent={onDeleteEvent}
            />
          </div>
        </div>

        {showNotes && (
          <div className="dashboard-sidebar">
            <StickyNotesSidebar
              notes={notes}
              onAddNote={onAddNote}
              onUpdateNote={onUpdateNote}
              onDeleteNote={onDeleteNote}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
