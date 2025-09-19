import createHttpError from 'http-errors';
import {
  createEntryDiary,
  deleteEntryById,
  getAllEntriesDiary,
  getEntryById,
  updateEntryDiaries,
} from '../services/diaries.js';

export const createEntryDiariesController = async (req, res) => {
  const { title, description, date, emotions } = req.body;
  const newDiary = await createEntryDiary({
    title,
    description,
    date,
    emotions,
    userId: req.user._id,
  });

  res.status(201).json({
    status: 201,
    message: 'Diary entry successfully created!',
    data: newDiary,
  });
};

export const getAllEntriesDiaryController = async (req, res) => {
  const entries = await getAllEntriesDiary(req.user._id);

  res.status(200).json({
    status: 200,
    message: 'Successfully found entries!',
    data: entries,
  });
};

export const getEntryByIdController = async (req, res) => {
  const { entryId } = req.params;
  const dataEntry = await getEntryById(entryId, req.user._id);

  if (!dataEntry) {
    throw createHttpError(404, 'Entry not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found entry with id ${entryId}!`,
    data: dataEntry,
  });
};

export const updateEntryDiariesController = async (req, res) => {
  const { entryId } = req.params;
  const updates = req.body;

  const updateEntry = await updateEntryDiaries(entryId, req.user._id, updates);

  if (!updateEntry) {
    throw createHttpError(404, 'Entry not found or no permission to update');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated entry!',
    data: updateEntry,
  });
};

export const deleteEntryByIdController = async (req, res) => {
  const { entryId } = req.params;
  const deleteEntry = await deleteEntryById(entryId, req.user._id);

  if (!deleteEntry) {
    throw createHttpError(404, 'Entry not found');
  }

  res.status(204).send();
};
