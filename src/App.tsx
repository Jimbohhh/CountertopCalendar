import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, StickyNote as StickyNoteIcon, Image } from 'lucide-react';
import Calendar from './components/Calendar';
import StickyNotes from './components/StickyNotes';
import PhotoGallery from './components/PhotoGallery';
import type { CalendarEvent, StickyNote, Photo } from './types';
import { storage } from './utils/storage';
import './App.css';

type TabType = 'calendar' | 'notes' | 'photos';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('calendar');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    setEvents(storage.getEvents());
    setNotes(storage.getNotes());
    setPhotos(storage.getPhotos());
  }, []);

  const handleAddEvent = (event: CalendarEvent) => {
    const newEvents = [...events, event];
    setEvents(newEvents);
    storage.saveEvents(newEvents);
  };

  const handleUpdateEvent = (updatedEvent: CalendarEvent) => {
    const newEvents = events.map((e) =>
      e.id === updatedEvent.id ? updatedEvent : e
    );
    setEvents(newEvents);
    storage.saveEvents(newEvents);
  };

  const handleDeleteEvent = (id: string) => {
    const newEvents = events.filter((e) => e.id !== id);
    setEvents(newEvents);
    storage.saveEvents(newEvents);
  };

  const handleAddNote = (note: StickyNote) => {
    const newNotes = [...notes, note];
    setNotes(newNotes);
    storage.saveNotes(newNotes);
  };

  const handleUpdateNote = (updatedNote: StickyNote) => {
    const newNotes = notes.map((n) =>
      n.id === updatedNote.id ? updatedNote : n
    );
    setNotes(newNotes);
    storage.saveNotes(newNotes);
  };

  const handleDeleteNote = (id: string) => {
    const newNotes = notes.filter((n) => n.id !== id);
    setNotes(newNotes);
    storage.saveNotes(newNotes);
  };

  const handleAddPhoto = (photo: Photo) => {
    const newPhotos = [...photos, photo];
    setPhotos(newPhotos);
    storage.savePhotos(newPhotos);
  };

  const handleDeletePhoto = (id: string) => {
    const newPhotos = photos.filter((p) => p.id !== id);
    setPhotos(newPhotos);
    storage.savePhotos(newPhotos);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Countertop Calendar</h1>
      </header>

      <nav className="app-nav">
        <button
          className={`tab-btn ${activeTab === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveTab('calendar')}
        >
          <CalendarIcon size={20} />
          Calendar
        </button>
        <button
          className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveTab('notes')}
        >
          <StickyNoteIcon size={20} />
          Notes
        </button>
        <button
          className={`tab-btn ${activeTab === 'photos' ? 'active' : ''}`}
          onClick={() => setActiveTab('photos')}
        >
          <Image size={20} />
          Photos
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'calendar' && (
          <Calendar
            events={events}
            onAddEvent={handleAddEvent}
            onUpdateEvent={handleUpdateEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        )}
        {activeTab === 'notes' && (
          <StickyNotes
            notes={notes}
            onAddNote={handleAddNote}
            onUpdateNote={handleUpdateNote}
            onDeleteNote={handleDeleteNote}
          />
        )}
        {activeTab === 'photos' && (
          <PhotoGallery
            photos={photos}
            onAddPhoto={handleAddPhoto}
            onDeletePhoto={handleDeletePhoto}
          />
        )}
      </main>
    </div>
  );
}

export default App;
