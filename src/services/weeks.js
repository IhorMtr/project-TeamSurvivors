import createHttpError from 'http-errors';
import { BabyStatesCollection } from '../db/models/babyStates.js';
import {
  calcDaysLeftToBirth,
  calculateCurrentWeek,
} from '../utils/calcPregnancyDates.js';

export const getMyDay = async (estimateBirthDate) => {
  const daysLeftToBirth = calcDaysLeftToBirth(estimateBirthDate);
  const currentWeek = calculateCurrentWeek(daysLeftToBirth);
  const babyState = await BabyStatesCollection.findOne({
    weekNumber: currentWeek,
  });
  if (babyState) {
    return {
      daysLeftToBirth,
      ...babyState._doc,
    };
  }
  throw createHttpError(404, 'Info not found, enter valid estimate date');
};
