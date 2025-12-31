import React, { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import type { StickyNote } from '../types';

interface StickyNotesSidebarProps {
  notes: StickyNote[];
  onAddNote: (note: StickyNote) => void;
  onUpdateNote: (note: StickyNote) => void;
  onDeleteNote: (id: string) => void;
}

const StickyNotesSidebar: React.FC<StickyNotesSidebarProps> = ({
  notes,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const noteColors = [
    '#fef3c7', // Yellow
    '#dbeafe', // Blue
    '#dcfce7', // Green
    '#fce7f3', // Pink
    '#f3e8ff', // Purple
    '#fed7aa', // Orange
  ];

  const handleAddNote = () => {
    const newNote: StickyNote = {
      id: Date.now().toString(),
      content: '',
      color: noteColors[Math.floor(Math.random() * noteColors.length)],
      position: { x: 100, y: 100 },
      createdAt: new Date(),
    };
    onAddNote(newNote);
    setEditingId(newNote.id);
    setEditContent('');
  };

  const handleStartEdit = (note: StickyNote) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const handleSaveEdit = (note: StickyNote) => {
    onUpdateNote({
      ...note,
      content: editContent,
    });
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    if (editingId && !notes.find((n) => n.id === editingId)?.content) {
      onDeleteNote(editingId);
    }
    setEditingId(null);
  };

  return (
    <div className="sticky-notes-sidebar">
      <div className="sidebar-header">
        <h3>Sticky Notes</h3>
        <button onClick={handleAddNote} className="sidebar-add-btn" title="Add Note">
          <Plus size={18} />
        </button>
      </div>

      <div className="sidebar-notes-list">
        {notes.length === 0 ? (
          <div className="sidebar-empty">
            <p>No notes yet</p>
            <button onClick={handleAddNote} className="sidebar-empty-btn">
              Create your first note
            </button>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="sidebar-note"
              style={{ backgroundColor: note.color }}
            >
              {editingId === note.id ? (
                <div className="sidebar-note-edit">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="Type your note..."
                    autoFocus
                    className="sidebar-note-textarea"
                  />
                  <div className="sidebar-note-actions">
                    <button
                      onClick={() => handleSaveEdit(note)}
                      className="sidebar-save-btn"
                    >
                      Save
                    </button>
                    <button onClick={handleCancelEdit} className="sidebar-cancel-btn">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="sidebar-note-view">
                  <div className="sidebar-note-content">
                    {note.content || 'Empty note'}
                  </div>
                  <div className="sidebar-note-buttons">
                    <button
                      onClick={() => handleStartEdit(note)}
                      className="sidebar-note-btn"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => onDeleteNote(note.id)}
                      className="sidebar-note-btn sidebar-delete-btn"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StickyNotesSidebar;
