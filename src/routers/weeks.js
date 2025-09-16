import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getMyDayController,
  getMyDayDemoController,
} from '../controllers/weeks.js';

const router = Router();

router.get('/my-day-demo', ctrlWrapper(getMyDayDemoController));

router.get('/my-day/:estimateBirthDate', ctrlWrapper(getMyDayController));

export default router;
