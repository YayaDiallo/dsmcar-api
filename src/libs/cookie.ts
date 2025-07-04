import { authConfig } from '@/config/auth.config.js';
import env from '@/env.js';
import { jwtService } from '@/libs/index.js';
import { Response } from 'express';

class CookieService {
  async attachCookieToResponse(
    response: Response,
    payload: { userId: string; email: string },
  ) {
    const threeMonths = 1000 * 60 * 60 * 24 * 30;
    const token = await jwtService.generateToken(
      payload,
      authConfig.jwtLifeTime,
    );
    const cookieOptions = {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      signed: true,
      maxAge: threeMonths,
    };

    response.cookie('accessToken', token, cookieOptions);
  }
}

export const cookieService = new CookieService();
