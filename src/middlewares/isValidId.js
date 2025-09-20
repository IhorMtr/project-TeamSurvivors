import createHttpError from 'http-errors';
import mongoose from 'mongoose';

export const isValidId = (paramName = 'id') => (req, res, next) => {
  const id = req.params[paramName];
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createHttpError(400, `${paramName} must be a valid MongoDB ObjectId`));
  }
  next();
};
