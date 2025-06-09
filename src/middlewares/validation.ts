import { BadRequest } from '@/errors/index.js';
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';

interface RequestValidators {
  params?: AnyZodObject;
  body?: AnyZodObject;
  query?: AnyZodObject;
}

type AuthValidators = Omit<RequestValidators, 'params' | 'query'>;

function createValidationErrorMessage(error: ZodError): string {
  const field = !error.issues[0]?.path[0]
    ? ''
    : `${error.issues[0]?.path[0]}: `;
  return `${field}${error.issues[0]?.message}`;
}

function handleValidationError(error: unknown, next: NextFunction): void {
  if (error instanceof ZodError) {
    const message = createValidationErrorMessage(error);
    throw new BadRequest({
      message,
      statusCode: 400,
      code: 'ERR_VALIDATION',
    });
  }
  next(error);
}

function createValidationMiddleware(validators: RequestValidators) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const validationTasks = [
        { validator: validators.params, target: 'params' as const },
        { validator: validators.body, target: 'body' as const },
        { validator: validators.query, target: 'query' as const },
      ];

      for (const { validator, target } of validationTasks) {
        if (validator) {
          request[target] = await validator.parseAsync(request[target]);
        }
      }

      next();
    } catch (error) {
      handleValidationError(error, next);
    }
  };
}

export function validateAuthRequest(validators: AuthValidators) {
  return createValidationMiddleware(validators);
}

export function validateRequest(validators: RequestValidators) {
  return createValidationMiddleware(validators);
}
