import createHttpError from 'http-errors';
import { UserCollection } from '../db/models/user.js';
import {
  getUserById,
  updateUserData,
  updateUserPhoto,
} from '../services/users.js';

export const getUserDataController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await getUserById(userId);
    if (!user) {
      throw createHttpError(404, 'User not found');
    }
    res.status(200).json({
      status: 200,
      message: 'Successfully got a user!',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUserDataController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { name, email, gender, dueDate } = req.body;
    const updatedUser = await updateUserData(userId, {
      name,
      email,
      gender,
      dueDate,
    });

    if (!updatedUser) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully updated user!',
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUserPhotoController = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 400,
        message: 'No photo uploaded',
      });
    }

    const updatedUser = await updateUserPhoto(req.user._id, req.file.path);

    if (!updatedUser) {
      throw createHttpError(404, 'User not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully updated user photo!',
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};
