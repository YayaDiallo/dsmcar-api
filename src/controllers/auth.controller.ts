import { authConfig } from '@/config/index.js';
import env from '@/env.js';
import { cookieService, redisService } from '@/libs/index.js';
import { authService } from '@/services/index.js';
import { Request, Response } from 'express';
import { BaseController } from './base.controller.js';

class AuthController extends BaseController<typeof authService> {
  constructor() {
    super({
      path: '/auth',
      service: authService,
    });
  }

  async register(request: Request, response: Response) {
    const [user] = await this.service.register(request.body);
    if (!user) {
      return response.status(400).json({ message: 'User registration failed' });
    }
    await cookieService.attachCookieToResponse(response, {
      userId: user.id,
      email: user.email,
    });
    response.status(201).json({ user });
  }
  async login(request: Request, response: Response) {
    const user = await this.service.login(request.body);

    await cookieService.attachCookieToResponse(response, {
      userId: user.id,
      email: user.email,
    });
    response.status(200).json({ user });
  }
  async logout(request: Request, response: Response) {
    // FIXME: This is not the best way to handle token invalidation.
    if (request.token) {
      const ttl = authConfig.jwtLifeTime as string;
      const regex = /[A-z]/g;
      await redisService.blacklistToken(request.token, +ttl.replace(regex, ''));
    }

    response.clearCookie('accessToken', {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      signed: true,
    });
    response.status(204).send();
  }
}

export const authController = new AuthController();
