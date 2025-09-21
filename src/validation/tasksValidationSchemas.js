import Joi from 'joi';

const today = new Date().toISOString().split('T')[0];

export const createTaskSchema = Joi.object({
    name: Joi.string().min(1).max(96).required(),
    date: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .required()
        .custom((value, helpers) => {
            if (value < today) {
                return helpers.error('any.invalid');
            }
            return value;
        })
        .messages({
            'string.pattern.base': 'Date must be in format YYYY-MM-DD',
            'any.invalid': 'Date cannot be earlier than today',
        }),
    isDone: Joi.boolean().default(false),
});

export const updateTaskStatusSchema = Joi.object({
    isDone: Joi.boolean().required(),
});
