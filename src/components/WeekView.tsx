import React from 'react';
import type { CalendarEvent } from '../types';
import { getWeekDays, formatDate, isSameDayUtil } from '../utils/dateUtils';

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onDateClick,
  onEventClick,
}) => {
  const weekDays = getWeekDays(currentDate);
  const today = new Date();
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForDay = (date: Date) => {
    return events.filter((event) => isSameDayUtil(event.date, date));
  };

  return (
    <div className="week-view">
      <div className="week-header">
        <div className="time-gutter"></div>
        {weekDays.map((day, index) => {
          const isToday = isSameDayUtil(day, today);
          return (
            <div
              key={index}
              className={`week-day-header ${isToday ? 'today' : ''}`}
              onClick={() => onDateClick(day)}
            >
              <div className="day-name">{formatDate(day, 'EEE')}</div>
              <div className="day-number">{formatDate(day, 'd')}</div>
            </div>
          );
        })}
      </div>

      <div className="week-grid">
        <div className="time-column">
          {hours.map((hour) => (
            <div key={hour} className="time-slot">
              {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
            </div>
          ))}
        </div>

        {weekDays.map((day, dayIndex) => {
          const dayEvents = getEventsForDay(day);
          return (
            <div key={dayIndex} className="week-day-column">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="hour-slot"
                  onClick={() => onDateClick(day)}
                />
              ))}
              <div className="events-overlay">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="week-event"
                    style={{ backgroundColor: event.color || '#4f46e5' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                  >
                    <div className="event-title">{event.title}</div>
                    {event.startTime && (
                      <div className="event-time">{event.startTime}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekView;
