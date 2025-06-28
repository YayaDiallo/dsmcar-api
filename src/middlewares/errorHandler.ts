import env from '@/env.js';
import { CustomError } from '@/errors/customError.js';
import { getErrorMessage } from '@/utils/index.js';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  error: unknown,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (response.headersSent || !env.DEBUG_MODE) {
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
