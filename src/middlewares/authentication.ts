import { Unauthenticated } from '@/errors/unauthenticated.js';
import { jwtService } from '@/libs/jwt.js';
import { Request, Response, NextFunction } from 'express';

async function auth(request: Request, response: Response, next: NextFunction) {
  const accessToken = request.signedCookies.accessToken as string | undefined;

  if (!accessToken) {
    throw new Unauthenticated({
      message: 'Authentication required',
      statusCode: 401,
    });
  }
  try {
    await jwtService.verifyToken(accessToken);
  } catch (error: unknown) {
    console.log('error:', error);
    throw new Unauthenticated({
      message: 'Invalid access token',
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
