import { UsersCollection } from '../db/models/user.js';

export const getUserById = async (userId) => {
  const user = await UsersCollection.findById(userId);
  return user;
};

export const updateUserData = async (userId, payload) => {
  const updatedUser = await UsersCollection.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) return null;
  return updatedUser;
};

export const updateUserPhoto = async (userId, photoUrl) => {
  if (!photoUrl) return null;
  const updatedUser = await UsersCollection.findByIdAndUpdate(
    userId,
    { photo: photoUrl },
    { new: true, runValidators: true },
  );
  return updatedUser;
};
