import express from 'express';
import { getNotes, createNote, deleteNote } from '../controllers/simpleNotesController';
import { authenticateToken } from '../middleware/simpleAuth';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getNotes);
router.post('/', createNote);
router.delete('/:id', deleteNote);

export default router;