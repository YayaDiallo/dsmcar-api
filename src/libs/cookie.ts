import { jwtService } from '@/libs/index.js';
import { Response } from 'express';

class CookieService {
  async attachCookieToResponse(
    response: Response,
    payload: { userId: string; email: string },
  ) {
    const threeMonths = 1000 * 60 * 60 * 24 * 30;
    const token = await jwtService.generateToken(payload);
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      signed: true,
      maxAge: threeMonths,
    };

    response.cookie('accessToken', token, cookieOptions);
  }
}

export const cookieService = new CookieService();
