import React, { useState, useEffect } from 'react';
import { notesAPI } from '../utils/api';
import type { Note, User } from '../types';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await notesAPI.getNotes();
      setNotes(response.data);
    } catch (error: any) {
      setError('Failed to fetch notes');
    }
  };

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.title.trim() || !newNote.content.trim()) {
      setError('Title and content are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await notesAPI.createNote(newNote);
      setNewNote({ title: '', content: '' });
      setShowCreateForm(false);
      fetchNotes();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to create note');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      await notesAPI.deleteNote(id);
      fetchNotes();
    } catch (error: any) {
      setError('Failed to delete note');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Welcome, {user?.name}!</h1>
          <div className="header-actions">
            <button onClick={() => setShowCreateForm(true)} className="create-button">
              + New Note
            </button>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        {error && <div className="error-banner">{error}</div>}

        {showCreateForm && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Create New Note</h3>
                <button onClick={() => setShowCreateForm(false)} className="close-button">
                  ×
                </button>
              </div>
              <form onSubmit={handleCreateNote}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Note title"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Note content"
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    rows={6}
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button type="button" onClick={() => setShowCreateForm(false)} className="cancel-button">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading} className="save-button">
                    {loading ? 'Saving...' : 'Save Note'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="notes-grid">
          {notes.length === 0 ? (
            <div className="empty-state">
              <h3>No notes yet</h3>
              <p>Create your first note to get started!</p>
            </div>
          ) : (
            notes.map((note) => (
              <div key={note._id} className="note-card">
                <div className="note-header">
                  <h3>{note.title}</h3>
                  <button onClick={() => handleDeleteNote(note._id)} className="delete-button">
                    🗑️
                  </button>
                </div>
                <p className="note-content">{note.content}</p>
                <div className="note-footer">
                  <small>{new Date(note.createdAt).toLocaleDateString()}</small>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;