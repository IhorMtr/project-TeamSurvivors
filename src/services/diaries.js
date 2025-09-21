import { DiaryCollection } from '../db/models/diaries.js';

export const createEntryDiary = async (payload) => {
  const entry = await DiaryCollection.create(payload);
  await entry.populate('emotions');
  return entry;
};

export const getAllEntriesDiary = async (userId) => {
  const allEntries = await DiaryCollection.find({ userId })
    .sort({
      createdAt: -1,
    })
    .populate('emotions');
  return allEntries;
};

export const getEntryById = async (entryId, userId) => {
  const entry = await DiaryCollection.findOne({
    _id: entryId,
    userId,
  }).populate('emotions');
  return entry;
};

export const updateEntryDiaries = async (entryId, userId, payload) => {
  const updateEntry = await DiaryCollection.findOneAndUpdate(
    { _id: entryId, userId },
    payload,
    { new: true },
  ).populate('emotions');
  return updateEntry;
};

export const deleteEntryById = async (entryId, userId) => {
  return await DiaryCollection.findOneAndDelete({ _id: entryId, userId });
};
