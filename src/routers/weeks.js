import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getBabyStateController,
  getMomStateController,
  getMyDayController,
  getMyDayDemoController,
} from '../controllers/weeks.js';
import { authecticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/my-day-demo', ctrlWrapper(getMyDayDemoController));

router.use(authecticate);

router.get('/my-day/:estimateBirthDate', ctrlWrapper(getMyDayController));
router.get('/mom-state/:currentWeek', ctrlWrapper(getMomStateController));
router.get('/baby-state/:currentWeek', ctrlWrapper(getBabyStateController));

export default router;
