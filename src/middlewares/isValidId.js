import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { entryId } = req.params;
  if (!isValidObjectId(entryId)) {
    throw createHttpError(400, 'EntryId must be a valid MongoDB ObjectId');
  }
  next();
};
