import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { StickyNote } from '../types';

interface StickyNotesProps {
  notes: StickyNote[];
  onAddNote: (note: StickyNote) => void;
  onUpdateNote: (note: StickyNote) => void;
  onDeleteNote: (id: string) => void;
}

const StickyNotes: React.FC<StickyNotesProps> = ({
  notes,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
}) => {
  const noteColors = [
    '#fef3c7', // Yellow
    '#dbeafe', // Blue
    '#dcfce7', // Green
    '#fce7f3', // Pink
    '#f3e8ff', // Purple
    '#fed7aa', // Orange
  ];

  const handleAddNote = () => {
    // Get the notes board dimensions for better positioning
    const maxWidth = Math.max(300, window.innerWidth - 320);
    const maxHeight = Math.max(300, window.innerHeight - 350);

    const newNote: StickyNote = {
      id: Date.now().toString(),
      content: '',
      color: noteColors[Math.floor(Math.random() * noteColors.length)],
      position: {
        x: Math.min(Math.random() * (maxWidth - 250), maxWidth - 250),
        y: Math.min(Math.random() * (maxHeight - 250) + 50, maxHeight - 200),
      },
      createdAt: new Date(),
    };
    onAddNote(newNote);
  };

  return (
    <div className="sticky-notes-container">
      <div className="sticky-notes-header">
        <h2>Sticky Notes</h2>
        <button onClick={handleAddNote} className="add-note-btn">
          <Plus size={20} />
          New Note
        </button>
      </div>

      <div className="notes-board">
        {notes.map((note) => (
          <StickyNoteItem
            key={note.id}
            note={note}
            onUpdate={onUpdateNote}
            onDelete={onDeleteNote}
          />
        ))}
      </div>
    </div>
  );
};

interface StickyNoteItemProps {
  note: StickyNote;
  onUpdate: (note: StickyNote) => void;
  onDelete: (id: string) => void;
}

const StickyNoteItem: React.FC<StickyNoteItemProps> = ({
  note,
  onUpdate,
  onDelete,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [content, setContent] = useState(note.content);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'TEXTAREA') return;

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - note.position.x,
      y: e.clientY - note.position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const newPosition = {
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    };

    onUpdate({
      ...note,
      position: newPosition,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    onUpdate({
      ...note,
      content: newContent,
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).tagName === 'TEXTAREA') return;

    const touch = e.touches[0];
    setIsDragging(true);
    setDragOffset({
      x: touch.clientX - note.position.x,
      y: touch.clientY - note.position.y,
    });
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const touch = e.touches[0];
    const newPosition = {
      x: touch.clientX - dragOffset.x,
      y: touch.clientY - dragOffset.y,
    };

    onUpdate({
      ...note,
      position: newPosition,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
      return () => {
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div
      className={`sticky-note ${isDragging ? 'dragging' : ''}`}
      style={{
        backgroundColor: note.color,
        left: `${note.position.x}px`,
        top: `${note.position.y}px`,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className="note-header">
        <div className="note-grip">⋮⋮</div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
          className="delete-note-btn"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <textarea
        value={content}
        onChange={(e) => handleContentChange(e.target.value)}
        placeholder="Type your note..."
        className="note-content"
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default StickyNotes;
