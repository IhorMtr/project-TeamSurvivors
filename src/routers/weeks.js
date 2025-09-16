import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getMyDayController } from '../controllers/weeks.js';

const router = Router();

router.get('/my-day/:estimateBirthDate', ctrlWrapper(getMyDayController));

export default router;
