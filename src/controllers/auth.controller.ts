import { authService } from '@/services/index.js';
import { BaseController } from './base.controller.js';
import { Request, Response } from 'express';

// TODO: move this to a separate utility file
function attachCookiesToResponse({
  response,
  token,
}: {
  response: Response;
  token: string;
  userId?: string;
}) {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    maxAge: 24 * 60 * 60 * 1000,
  };

  response.cookie('accessToken', token, cookieOptions);
}

class AuthController extends BaseController<typeof authService> {
  constructor() {
    super({
      path: '/auth',
      service: authService,
    });
  }

  async register(request: Request, response: Response) {
    const [user] = await this.service.register(request.body);
    attachCookiesToResponse({
      response,
      token: 'user_token123',
      userId: user?.id,
    });
    response.status(201).json({ user });
  }
  async login(request: Request, response: Response) {
    await this.service.login(request.body);

    const user = await this.service.login(request.body);
    attachCookiesToResponse({
      response,
      token: 'user_token123',
      userId: user.id,
    });
    response.status(200).json({ user });
  }
}

export const authController = new AuthController();
