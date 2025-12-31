import type { CalendarEvent, StickyNote, Photo } from '../types';

const STORAGE_KEYS = {
  EVENTS: 'calendar_events',
  NOTES: 'sticky_notes',
  PHOTOS: 'photos',
};

export const storage = {
  // Events
  getEvents: (): CalendarEvent[] => {
    const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
    if (!data) return [];
    return JSON.parse(data).map((e: any) => ({
      ...e,
      date: new Date(e.date),
    }));
  },

  saveEvents: (events: CalendarEvent[]): void => {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  },

  // Sticky Notes
  getNotes: (): StickyNote[] => {
    const data = localStorage.getItem(STORAGE_KEYS.NOTES);
    if (!data) return [];
    return JSON.parse(data).map((n: any) => ({
      ...n,
      createdAt: new Date(n.createdAt),
    }));
  },

  saveNotes: (notes: StickyNote[]): void => {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  },

  // Photos
  getPhotos: (): Photo[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PHOTOS);
    if (!data) return [];
    return JSON.parse(data).map((p: any) => ({
      ...p,
      uploadedAt: new Date(p.uploadedAt),
    }));
  },

  savePhotos: (photos: Photo[]): void => {
    localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(photos));
  },
};
