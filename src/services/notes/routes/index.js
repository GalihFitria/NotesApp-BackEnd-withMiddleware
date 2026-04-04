import express from 'express';
import {
  createNote,
  getNotes,
  updateNote,
  getNoteById,
  deleteNote,
} from '../controller/note-controller.js';
import validate from '../../../middlewares/validate.js';
import { notePayloadSchema } from '../validator/schema.js';

const router = express.Router();

router.post('/notes', validate(notePayloadSchema), createNote);
router.get('/notes', getNotes);
router.get('/notes/:id', getNoteById);
router.put('/notes/:id', validate(notePayloadSchema), updateNote);
router.delete('/notes/:id', deleteNote);

export default router;
