import createHttpError from 'http-errors';
import {
  getUserById,
  updateUserData,
  updateUserPhoto,
} from '../services/users.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { CLOUDINARY } from '../constants/index.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import fs from 'fs/promises';

export const getUserDataController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await getUserById(userId);
    if (!user) {
      throw createHttpError(404, 'User not found');
    }
    res.status(200).json({
      status: 200,
      message: 'Successfully found a user!',
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
    const photo = req.file;
    if (!photo) {
      return res.status(400).json({
        status: 400,
        message: 'No photo uploaded',
      });
    }

    let photoUrl;
    if (getEnvVar(CLOUDINARY.ENABLE_CLOUDINARY) === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }

    if (photo.path) {
      await fs.unlink(photo.path).catch((err) => {
        console.error('Failed to delete temp file:', err.message);
      });
    }

    const updatedUser = await updateUserPhoto(req.user._id, photoUrl);

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
