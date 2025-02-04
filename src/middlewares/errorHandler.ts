import { Request, Response, NextFunction } from 'express';
import { getErrorMessage } from '../utils/index.js';
import { CustomError } from '../errors/customError.js';
export const errorHandler = (
  error: unknown,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  if (error instanceof CustomError) {
    response.status(error.statusCode).json({
      error: {
        message: error.message,
        code: error.code,
      },
    });
    return;
  }

  return response.status(500).json({
    error: {
      message:
        getErrorMessage(error) ||
        'An error occurred. Please view logs for more details',
    },
  });
};
