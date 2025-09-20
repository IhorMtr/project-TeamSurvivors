import createHttpError from 'http-errors';
import { BabyStatesCollection } from '../db/models/babyStates.js';
import {
  calcDaysLeftToBirth,
  calculateCurrentWeek,
} from '../utils/calcPregnancyDates.js';
import { MomStatesCollection } from '../db/models/momStates.js';

export const getMyDay = async (estimateBirthDate) => {
  const daysLeftToBirth = calcDaysLeftToBirth(estimateBirthDate);
  const currentWeek = calculateCurrentWeek(daysLeftToBirth);
  const babyState = await BabyStatesCollection.findOne({
    weekNumber: currentWeek,
  });
  if (!babyState) {
    throw createHttpError(404, 'Info not found, enter valid estimate date');
  }
  return {
    _id: babyState._id,
    daysLeftToBirth,
    weekNumber: babyState.weekNumber,
    babySize: babyState.babySize,
    babyWeight: babyState.babyWeight,
    image: babyState.image,
    babyActivity: babyState.babyActivity,
    babyDevelopment: babyState.babyDevelopment,
    momDailyTips: babyState.momDailyTips,
  };
};

export const getMomState = async (currentWeek) => {
  const momState = await MomStatesCollection.findOne({
    weekNumber: currentWeek,
  });
  if (!momState) {
    throw createHttpError(
      404,
      'Info not found, please set a valid current pregnancy week',
    );
  }
  return momState;
};

export const getBabyState = async (currentWeek) => {
  const babyState = await BabyStatesCollection.findOne({
    weekNumber: currentWeek,
  });
  if (!babyState) {
    throw createHttpError(
      404,
      'Info not found, please set a valid current pregnancy week',
    );
  }
  return {
    _id: babyState._id,
    weekNumber: babyState.weekNumber,
    analogy: babyState.analogy,
    image: babyState.image,
    babyDevelopment: babyState.babyDevelopment,
    interestingFact: babyState.interestingFact,
  };
};
