import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getBabyStateController,
  getMomStateController,
  getMyDayController,
  getMyDayDemoController,
} from '../controllers/weeks.js';

const router = Router();

router.get('/my-day-demo', ctrlWrapper(getMyDayDemoController));

router.get('/my-day/:estimateBirthDate', ctrlWrapper(getMyDayController));
router.get('/mom-state/:currentWeek', ctrlWrapper(getMomStateController));
router.get('/baby-state/:currentWeek', ctrlWrapper(getBabyStateController));

export default router;
