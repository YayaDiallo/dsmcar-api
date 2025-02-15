import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { BadRequest } from '../errors/index.js';

interface RequestValidators {
  params?: AnyZodObject;
  body?: AnyZodObject;
  query?: AnyZodObject;
}

export function validateRequest(validators: RequestValidators) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      if (validators.params) {
        request.params = await validators.params.parseAsync(request.params);
      }
      if (validators.body) {
        request.body = await validators.body.parseAsync(request.body);
      }
      if (validators.query) {
        request.query = await validators.query.parseAsync(request.query);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const field = !error.issues[0]?.path[0]
          ? ''
          : `${error.issues[0]?.path[0]}: `;
        const message = `${field}${error.issues[0]?.message}`;
        throw new BadRequest({
          message: message,
          statusCode: 400,
          code: 'ERR_VALIDATION',
        });
      }
      next(error);
    }
  };
}
