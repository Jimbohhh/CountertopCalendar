export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  description?: string;
  color?: string;
}

export interface StickyNote {
  id: string;
  content: string;
  color: string;
  position: { x: number; y: number };
  createdAt: Date;
}

export interface Photo {
  id: string;
  url: string;
  thumbnail: string;
  caption?: string;
  uploadedAt: Date;
}

export type ViewType = 'month' | 'week' | 'day';

export interface AppState {
  events: CalendarEvent[];
  notes: StickyNote[];
  photos: Photo[];
  currentView: ViewType;
  selectedDate: Date;
}
