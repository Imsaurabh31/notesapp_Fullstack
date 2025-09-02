import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState<any>(null);
  const [notes, setNotes] = useState<any[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
      setCurrentView('dashboard');
      fetchNotes();
    }
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/notes', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Failed to fetch notes');
    }
  };

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newNote)
      });
      
      if (response.ok) {
        setNewNote({ title: '', content: '' });
        setShowCreateForm(false);
        fetchNotes();
      }
    } catch (error) {
      alert('Failed to create note');
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (!confirm('Delete this note?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        fetchNotes();
      }
    } catch (error) {
      alert('Failed to delete note');
    }
  };
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/auth/${currentView}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (response.ok) {
        if (currentView === 'signup') {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          setCurrentView('dashboard');
        } else {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          setCurrentView('dashboard');
        }
      } else {
        alert(data.message || 'Error occurred');
      }
    } catch (error) {
      alert('Connection error. Make sure backend is running.');
    }
  };

  if (currentView === 'dashboard') {
    return (
      <div className="app">
        <div className="dashboard">
          <div className="dashboard-header">
            <h1>Welcome, {user?.name}!</h1>
            <button onClick={() => {
              localStorage.clear();
              setCurrentView('login');
              setUser(null);
            }}>Logout</button>
          </div>
          <div className="dashboard-content">
            <div className="notes-header">
              <h2>Your Notes ({notes.length})</h2>
              <button onClick={() => setShowCreateForm(true)}>+ Create Note</button>
            </div>
            
            {showCreateForm && (
              <div className="create-form">
                <form onSubmit={handleCreateNote}>
                  <input
                    type="text"
                    placeholder="Note title"
                    value={newNote.title}
                    onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                    required
                  />
                  <textarea
                    placeholder="Note content"
                    value={newNote.content}
                    onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                    rows={4}
                    required
                  />
                  <div className="form-buttons">
                    <button type="button" onClick={() => setShowCreateForm(false)}>Cancel</button>
                    <button type="submit">Save Note</button>
                  </div>
                </form>
              </div>
            )}
            
            <div className="notes-grid">
              {notes.length === 0 ? (
                <p>No notes yet. Create your first note!</p>
              ) : (
                notes.map((note) => (
                  <div key={note._id} className="note-card">
                    <div className="note-header">
                      <h3>{note.title}</h3>
                      <button onClick={() => handleDeleteNote(note._id)}>🗑️</button>
                    </div>
                    <p>{note.content}</p>
                    <small>{new Date(note.createdAt).toLocaleDateString()}</small>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="auth-container">
        <div className="auth-card">
          <h2>{currentView === 'login' ? 'Login' : 'Sign Up'}</h2>
          
          <form onSubmit={handleSubmit}>
            {currentView === 'signup' && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            )}
            
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            
            <button type="submit">
              {currentView === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <p>
            {currentView === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button" 
              onClick={() => setCurrentView(currentView === 'login' ? 'signup' : 'login')}
              style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
            >
              {currentView === 'login' ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;