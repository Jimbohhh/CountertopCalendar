import React from 'react';
import type { CalendarEvent } from '../types';
import { getMonthDays, formatDate, isSameDayUtil, isSameMonthUtil } from '../utils/dateUtils';

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  onDateClick,
  onEventClick,
}) => {
  const days = getMonthDays(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();

  const getEventsForDay = (date: Date) => {
    return events.filter((event) => isSameDayUtil(event.date, date));
  };

  return (
    <div className="month-view">
      <div className="weekday-headers">
        {weekDays.map((day) => (
          <div key={day} className="weekday-header">
            {day}
          </div>
        ))}
      </div>

      <div className="month-grid">
        {days.map((day, index) => {
          const dayEvents = getEventsForDay(day);
          const isToday = isSameDayUtil(day, today);
          const isCurrentMonth = isSameMonthUtil(day, currentDate);

          return (
            <div
              key={index}
              className={`day-cell ${!isCurrentMonth ? 'other-month' : ''} ${
                isToday ? 'today' : ''
              }`}
              onClick={() => onDateClick(day)}
            >
              <div className="day-number">{formatDate(day, 'd')}</div>
              <div className="day-events">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="event-chip"
                    style={{ backgroundColor: event.color || '#4f46e5' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="event-more">+{dayEvents.length - 3} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
