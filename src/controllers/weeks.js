import { getMyDay } from '../services/weeks.js';
import createHttpError from 'http-errors';
import { calculateDemoDaysLeft } from '../utils/calcPregnancyDates.js';

export const getMyDayController = async (req, res, next) => {
  const { estimateBirthDate } = req.params;
  const myDay = await getMyDay(estimateBirthDate);
  res.json({
    status: 200,
    message: `Successfully found my day info!`,
    data: myDay,
  });
};

export const getMyDayDemoController = async (req, res, next) => {
  const estimateBirthDate = calculateDemoDaysLeft();
  const myDay = await getMyDay(estimateBirthDate);
  res.json({
    status: 200,
    message: `Successfully found my day info!`,
    data: myDay,
  });
};
