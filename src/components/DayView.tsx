import React from 'react';
import type { CalendarEvent } from '../types';
import { formatDate, isSameDayUtil } from '../utils/dateUtils';

interface DayViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

const DayView: React.FC<DayViewProps> = ({ currentDate, events, onEventClick }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const dayEvents = events.filter((event) => isSameDayUtil(event.date, currentDate));

  return (
    <div className="day-view">
      <div className="day-header">
        <h3>{formatDate(currentDate, 'EEEE, MMMM d, yyyy')}</h3>
      </div>

      <div className="day-schedule">
        <div className="time-column">
          {hours.map((hour) => (
            <div key={hour} className="time-slot">
              {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
            </div>
          ))}
        </div>

        <div className="day-column">
          {hours.map((hour) => (
            <div key={hour} className="hour-slot" />
          ))}
          <div className="events-overlay">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className="day-event"
                style={{ backgroundColor: event.color || '#4f46e5' }}
                onClick={() => onEventClick(event)}
              >
                <div className="event-title">{event.title}</div>
                {event.startTime && event.endTime && (
                  <div className="event-time">
                    {event.startTime} - {event.endTime}
                  </div>
                )}
                {event.description && (
                  <div className="event-description">{event.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayView;
