import Joi from 'joi';
import { FORTY_WEEKS, ONE_WEEK } from '../constants/index.js';

export const updateUserSchema = Joi.object({
  name: Joi.string().min(1).max(32).messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least 1 character',
    'string.max': 'Name cannot exceed 32 characters',
  }),
  email: Joi.string().min(3).max(30).email().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email cannot be empty',
    'string.min': 'Email must be at least 3 characters',
    'string.max': 'Email cannot exceed 30 characters',
    'string.email': 'Email must be a valid email address',
  }),
  gender: Joi.string().valid('boy', 'girl', null).messages({
    'any.only': 'Gender must be either "boy", "girl", or null',
  }),
  photo: Joi.string().allow(null, '').messages({
    'string.base': 'Photo must be a string',
  }),
  dueDate: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .custom((value, helpers) => {
      const date = new Date(value);
      if (date < ONE_WEEK || date > FORTY_WEEKS) {
        return helpers.message(
          'Due date must be between 1 and 40 weeks from today',
        );
      }
      return value;
    })
    .messages({
      'string.pattern.base': 'Due date must be in YYYY-MM-DD format',
    }),
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided',
  });
