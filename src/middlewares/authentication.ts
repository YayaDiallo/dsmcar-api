import { Unauthenticated } from '@/errors/unauthenticated.js';
import { jwtService, redisService } from '@/libs/index.js';
import { NextFunction, Request, Response } from 'express';

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
    request.token = accessToken;
  } catch (error: unknown) {
    throw new Unauthenticated({
      message: 'Invalid access token',
      statusCode: 401,
    });
  }
  const isBlacklisted = await redisService.isTokenBlacklisted(accessToken);
  if (isBlacklisted) {
    throw new Unauthenticated({
      message: 'Access token is blacklisted',
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
