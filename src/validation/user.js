import Joi from 'joi';
export const updateUserSchema = Joi.object({
  name: Joi.string().min(1).max(32),
  email: Joi.string().min(3).max(30).email(),
  gender: Joi.string().valid('boy', 'girl', null),
  photo: Joi.string().allow(null, ''),
  dueDate: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .custom((value, helpers) => {
      const date = new Date(value);
      if (date < oneWeek || date > fortyWeeks) {
        return helpers.message(
          'Due date must be between 1 and 40 weeks from today',
        );
      }
    }),
}).min(1);
