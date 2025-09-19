import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const diariesValidationSchemaCreate = Joi.object({
  title: Joi.string().trim().min(1).max(64).required().messages({
    'string.base': 'Title must be a string',
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 1 character long',
    'string.max': 'Title can be maximum 64 characters long',
    'any.required': 'Title is required',
  }),

  description: Joi.string().trim().min(1).max(1000).required().messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 1 character long',
    'string.max': 'Description can be maximum 1000 characters long',
    'any.required': 'Description is required',
  }),

  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .default(() => new Date().toISOString().split('T')[0])
    .messages({
      'string.pattern.base': "Date must be in 'YYYY-MM-DD' format",
    }),

  emotions: Joi.array()
    .items(
      Joi.string().custom((value, helper) => {
        if (!isValidObjectId(value)) {
          return helper.message('Emotion id must be a valid MongoDB ObjectId');
        }
        return value;
      }),
    )
    .min(1)
    .max(12)
    .required()
    .messages({
      'array.base': 'Emotions must be an array of ids',
      'array.min': 'At least 1 emotion is required',
      'array.max': 'No more than 12 emotions are allowed',
      'any.required': 'Emotions are required',
    }),

  userId: Joi.string().custom((value, helper) => {
    if (!isValidObjectId(value)) {
      return helper.message('User id should be a valid MongoDB ObjectId');
    }
    return value;
  }),
});

export const diariesValidationSchemaUpdate = Joi.object({
  title: Joi.string().trim().min(1).max(64).messages({
    'string.base': 'Title must be a string',
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 1 character long',
    'string.max': 'Title can be maximum 64 characters long',
  }),

  description: Joi.string().trim().min(1).max(1000).messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 1 character long',
    'string.max': 'Description can be maximum 1000 characters long',
  }),

  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .default(() => new Date().toISOString().split('T')[0])
    .messages({
      'string.pattern.base': "Date must be in 'YYYY-MM-DD' format",
    }),

  emotions: Joi.array()
    .items(
      Joi.string().custom((value, helper) => {
        if (!isValidObjectId(value)) {
          return helper.message('Emotion id must be a valid MongoDB ObjectId');
        }
        return value;
      }),
    )
    .min(1)
    .max(12)
    .messages({
      'array.base': 'Emotions must be an array of ids',
      'array.min': 'At least 1 emotion is required',
      'array.max': 'No more than 12 emotions are allowed',
    }),
});
