import React, { useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import type { CalendarEvent } from '../types';
import { formatDate } from '../utils/dateUtils';

interface EventModalProps {
  date: Date;
  event?: CalendarEvent | null;
  onSave: (event: CalendarEvent) => void;
  onDelete?: () => void;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({
  date,
  event,
  onSave,
  onDelete,
  onClose,
}) => {
  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');
  const [startTime, setStartTime] = useState(event?.startTime || '');
  const [endTime, setEndTime] = useState(event?.endTime || '');
  const [color, setColor] = useState(event?.color || '#4f46e5');

  const colors = [
    '#4f46e5', // Indigo
    '#ef4444', // Red
    '#10b981', // Green
    '#f59e0b', // Amber
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#06b6d4', // Cyan
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const eventData: CalendarEvent = {
      id: event?.id || Date.now().toString(),
      title: title.trim(),
      date: date,
      startTime: startTime || undefined,
      endTime: endTime || undefined,
      description: description.trim() || undefined,
      color,
    };

    onSave(eventData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{event ? 'Edit Event' : 'Add Event'}</h3>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event title"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="text"
              value={formatDate(date, 'MMMM d, yyyy')}
              readOnly
              className="readonly-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details..."
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Color</label>
            <div className="color-picker">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`color-option ${color === c ? 'selected' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>

          <div className="modal-actions">
            {onDelete && (
              <button type="button" onClick={onDelete} className="delete-btn">
                <Trash2 size={16} />
                Delete
              </button>
            )}
            <div className="action-buttons">
              <button type="button" onClick={onClose} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
