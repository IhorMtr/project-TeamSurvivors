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
  return {
    daysLeftToBirth,
    ...babyState,
  };
};
