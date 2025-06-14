import { Unauthenticated } from '@/errors/unauthenticated.js';
import { Request, Response, NextFunction } from 'express';

async function auth(request: Request, response: Response, next: NextFunction) {
  const accessToken = request.signedCookies.accessToken;

  if (!accessToken) {
    throw new Unauthenticated({
      message: 'Authentication required',
      statusCode: 401,
    });
  }

  next();
}

export async function assertAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await auth(request, response, next);
}
