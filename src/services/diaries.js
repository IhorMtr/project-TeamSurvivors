import { Diary } from '../db/models/diaries.js';

export const createEntryDiary = async (payload) => {
  const entry = await Diary.create(payload);
  return entry;
};

export const getAllEntriesDiary = async (userId) => {
  const allEntries = await Diary.find({ userId }).sort({ createdAt: -1 });
  return allEntries;
};

export const getEntryById = async (entryId, userId) => {
  const entry = await Diary.findOne({ _id: entryId, userId });
  return entry;
};

export const updateEntryDiaries = async (entryId, userId, payload) => {
  const updateEntry = await Diary.findOneAndUpdate(
    { _id: entryId, userId },
    payload,
    { new: true },
  );
  return updateEntry;
};

export const deleteEntryById = async (entryId, userId) => {
  return await Diary.findOneAndDelete({ _id: entryId, userId });
};
