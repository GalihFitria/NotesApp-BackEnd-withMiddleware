import { nanoid } from "nanoid";
import notes from "../src/notes.js";

export const createNote = (req, res, next) => {
  const { title = "untitled", tags, body } = req.body;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = { title, tags, body, id, createdAt, updatedAt };
  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    return res.status(201).json({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: { noteId: id },
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Catatan gagal ditambahkan",
  });
};

export const getNotes = (req, res) => {
  return res.json({
    status: "success",
    data: { notes },
  });
};

export const updateNote = (req, res) => {
  const { id } = req.params;
  const { title, tags, body } = req.body;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt: new Date().toISOString(),
    };

    return res.json({
      status: "success",
      message: "Catatan berhasil diperbarui",
    });
  }

  return res.status(404).json({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
};

export const getNoteById = (req, res) => {
  const { id } = req.params;

  const note = notes.find((note) => note.id === id);

  if (note) {
    return res.json({
      status: "success",
      data: { note },
    });
  }

  return res.status(404).json({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
};

export const deleteNote = (req, res) => {
  const { id } = req.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);

    return res.json({
      status: "success",
      message: "Catatan berhasil dihapus",
    });
  }

  return res.status(404).json({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
};

