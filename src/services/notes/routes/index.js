import express from "express";
import { createNote, getNotes, updateNote, getNoteById, deleteNote } from "../controller/note-controller.js";

const router = express.Router();

router.post("/notes", createNote);
router.get("/notes", getNotes);
router.put("/notes/:id", updateNote);
router.get("/notes/:id", getNoteById);
router.delete("/notes/:id", deleteNote);

export default router;
