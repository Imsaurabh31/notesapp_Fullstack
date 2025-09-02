import { Request, Response } from 'express';

interface AuthRequest extends Request {
  user?: any;
}

// Simple in-memory notes storage
const notes: any[] = [];

export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    const userNotes = notes.filter(note => note.userId === req.user?.id);
    res.json(userNotes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content } = req.body;
    
    const note = {
      _id: Date.now().toString(),
      title,
      content,
      userId: req.user?.id,
      createdAt: new Date().toISOString()
    };
    
    notes.push(note);
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const noteIndex = notes.findIndex(note => note._id === id && note.userId === req.user?.id);
    
    if (noteIndex === -1) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    notes.splice(noteIndex, 1);
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};