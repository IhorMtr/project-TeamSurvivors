import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (e) {
    const error = createHttpError(400, 'Bad request', {
      error: e.details,
    });
    next(error);
  }
};
