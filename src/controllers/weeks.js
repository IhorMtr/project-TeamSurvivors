import { getMyDay } from '../services/weeks.js';
import createHttpError from 'http-errors';

export const getMyDayController = async (req, res, next) => {
  const { estimateBirthDate } = req.params;
  const myDay = await getMyDay(estimateBirthDate);
  if (!myDay) {
    throw createHttpError(404, 'Info not found, enter valid estimate date');
  }
  res.json({
    status: 200,
    message: `Successfully my day info!`,
    data: myDay,
  });
};
