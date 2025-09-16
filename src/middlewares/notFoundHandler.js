import createHttpError from 'http-errors';

export async function notFoundHandler(req, res, next) {
  next(createHttpError(404, 'Route not found'));
}
