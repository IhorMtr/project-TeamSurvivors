import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginWithGoogleOAuthSchema,
  registerUserSchema,
} from '../validation/auth.js';
import {
  loginWithGoogleController,
  registerUserController,
} from '../controllers/auth.js';
import { loginUserSchema } from '../validation/auth.js';
import { loginUserController } from '../controllers/auth.js';
import { logoutUserController } from '../controllers/auth.js';
import { refreshUsersSessionController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { getGoogleOAuthUrlController } from '../controllers/auth.js';

const router = Router();
export default router;
router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUsersSessionController));

router.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));
router.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);
