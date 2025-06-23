import { cookieService } from '@/libs/index.js';
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
    cookieService.attachCookieToResponse(response, {
      userId: user.id,
      email: user.email,
    });
    response.status(201).json({ user });
  }
  async login(request: Request, response: Response) {
    await this.service.login(request.body);

    const user = await this.service.login(request.body);

    await cookieService.attachCookieToResponse(response, {
      userId: user.id,
      email: user.email,
    });
    response.status(200).json({ user });
  }
  async logout(request: Request, response: Response) {
    // TODO: blackList the token
    response.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      signed: true,
    });
    response.status(204).send();
  }
}

export const authController = new AuthController();
