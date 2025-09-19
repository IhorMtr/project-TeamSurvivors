import { UserCollection } from '../db/models/user.js';

export const getUserById = async (userId) => {
  const user = await UserCollection.findById(userId);
  return user;
};

export const updateUserData = async (userId, payload) => {
  const updatedUser = await UserCollection.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) return null;
  return updatedUser;
};

export const updateUserPhoto = async (userId, photoUrl) => {
  if (photoUrl) {
    payload.photo = photoUrl;
  }
  const updatedUser = await UserCollection.findByIdAndUpdate(
    userId,
    { photo: photoUrl },
    {
      new: true,
      runValidators: true,
    },
  );
  return updatedUser;
};
