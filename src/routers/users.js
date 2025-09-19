import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getUserDataController,
  updateUserDataController,
  updateUserPhotoController,
} from '../controllers/users.js';
import { updateUserSchema } from '../validation/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.get('/me', ctrlWrapper(getUserDataController));

router.patch(
  '/me',

  validateBody(updateUserSchema),
  ctrlWrapper(updateUserDataController),
);
router.patch(
  '/me/photo',

  upload.single('photo'),
  ctrlWrapper(updateUserPhotoController),
);

export default router;
