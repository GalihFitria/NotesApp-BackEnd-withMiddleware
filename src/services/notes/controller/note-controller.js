import { nanoid } from 'nanoid';
import NoteRepositories from '../repositories/note-repositories.js';
import { InvariantError, NotFoundError } from '../../../exceptions/index.js';
import response from '../../../utils/response.js';

export const createNote = async (req, res, next) => {
  const { title, body, tags } = req.validated;
  const note = await NoteRepositories.createNote({
    title,
    body,
    tags,
  });

  if (!note) {
    return next(new InvariantError('Catatan gagal ditambahkan'));
  }

  return response(res, 201, 'Catatan berhasil ditambahkan', note);
};

export const getNotes = async (req, res, next) => {
  const notes = await NoteRepositories.getNotes();
  return response(res, 200, 'Catatan sukses ditampilkan', notes);
};

export const getNoteById = async (req, res, next) => {
  const { id } = req.params;
  const note = await NoteRepositories.getNoteById(id);

  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan sukses ditampilkan', note);
};

export const updateNote = async (req, res, next) => {
  const { id } = req.params;
  const { title, body, tags } = req.validated;

  const note = await NoteRepositories.updateNote({
    id,
    title,
    body,
    tags,
  });

  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil diperbarui', note);
};

export const deleteNote = async (req, res, next) => {
  const { id } = req.params;
  const deleteNote = await NoteRepositories.deleteNote(id);

  if (!deleteNote) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil dihapus', deleteNote);
};
