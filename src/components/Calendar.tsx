import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import type { CalendarEvent, ViewType } from '../types';
import { formatDate, navigateDate } from '../utils/dateUtils';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';
import EventModal from './EventModal';

interface CalendarProps {
  events: CalendarEvent[];
  onAddEvent: (event: CalendarEvent) => void;
  onDeleteEvent: (id: string) => void;
  onUpdateEvent: (event: CalendarEvent) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  events,
  onAddEvent,
  onDeleteEvent,
  onUpdateEvent,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<ViewType>('month');
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  const handlePrevious = () => {
    setCurrentDate(navigateDate(currentDate, 'prev', viewType));
  };

  const handleNext = () => {
    setCurrentDate(navigateDate(currentDate, 'next', viewType));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setShowEventModal(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setEditingEvent(event);
    setSelectedDate(event.date);
    setShowEventModal(true);
  };

  const getHeaderTitle = () => {
    if (viewType === 'month') {
      return formatDate(currentDate, 'MMMM yyyy');
    } else if (viewType === 'week') {
      return `Week of ${formatDate(currentDate, 'MMM d, yyyy')}`;
    } else {
      return formatDate(currentDate, 'EEEE, MMMM d, yyyy');
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button onClick={handlePrevious} className="nav-btn">
            <ChevronLeft size={20} />
          </button>
          <h2 className="calendar-title">{getHeaderTitle()}</h2>
          <button onClick={handleNext} className="nav-btn">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="calendar-controls">
          <button onClick={handleToday} className="today-btn">
            Today
          </button>

          <div className="view-switcher">
            <button
              className={`view-btn ${viewType === 'month' ? 'active' : ''}`}
              onClick={() => setViewType('month')}
            >
              Month
            </button>
            <button
              className={`view-btn ${viewType === 'week' ? 'active' : ''}`}
              onClick={() => setViewType('week')}
            >
              Week
            </button>
            <button
              className={`view-btn ${viewType === 'day' ? 'active' : ''}`}
              onClick={() => setViewType('day')}
            >
              Day
            </button>
          </div>

          <button
            onClick={() => {
              setSelectedDate(new Date());
              setEditingEvent(null);
              setShowEventModal(true);
            }}
            className="add-event-btn"
          >
            <Plus size={20} />
            Add Event
          </button>
        </div>
      </div>

      <div className="calendar-view">
        {viewType === 'month' && (
          <MonthView
            currentDate={currentDate}
            events={events}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />
        )}
        {viewType === 'week' && (
          <WeekView
            currentDate={currentDate}
            events={events}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />
        )}
        {viewType === 'day' && (
          <DayView
            currentDate={currentDate}
            events={events}
            onEventClick={handleEventClick}
          />
        )}
      </div>

      {showEventModal && (
        <EventModal
          date={selectedDate || new Date()}
          event={editingEvent}
          onSave={(event) => {
            if (editingEvent) {
              onUpdateEvent(event);
            } else {
              onAddEvent(event);
            }
            setShowEventModal(false);
          }}
          onDelete={
            editingEvent
              ? () => {
                  onDeleteEvent(editingEvent.id);
                  setShowEventModal(false);
                }
              : undefined
          }
          onClose={() => setShowEventModal(false)}
        />
      )}
    </div>
  );
};

export default Calendar;
