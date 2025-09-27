import Joi from 'joi';
import dayjs from 'dayjs';

const curDate = dayjs();

const minDate = curDate.add(1, 'week').toDate();

const maxDate = curDate.add(40, 'week').toDate();

export const registerUserSchema = Joi.object({
  name: Joi.string().min(1).max(32).required(),
  email: Joi.string().email().max(64).required(),
  password: Joi.string().min(8).max(128).required(),
  gender: Joi.string().valid('boy', 'girl').optional().allow(null),
  dueDate: Joi.date().min(minDate).max(maxDate).optional(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().max(64).required(),
  password: Joi.string().min(8).max(128).required(),
});

export const loginWithGoogleOAuthSchema = Joi.object({
  code: Joi.string().required(),
});
