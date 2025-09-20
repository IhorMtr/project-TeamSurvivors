import { Router } from 'express';
import {
  getUserDataController,
  updateUserDataController,
  updateUserPhotoController,
} from '../controllers/users.js';
import { updateUserSchema } from '../validation/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import { upload } from '../middlewares/multer.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/me', getUserDataController);

router.patch('/me', validateBody(updateUserSchema), updateUserDataController);

router.patch('/me/photo', upload.single('photo'), updateUserPhotoController);

export default router;
