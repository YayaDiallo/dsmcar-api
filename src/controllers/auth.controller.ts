import { authService } from '@/services/index.js';
import { BaseController } from './base.controller.js';
import { Request, Response } from 'express';

class AuthController extends BaseController<typeof authService> {
  constructor() {
    super({
      path: '/auth',
      service: authService,
    });
  }

  async register(request: Request, response: Response) {
    await this.service.register(request.body);
    response.status(201).json({ message: 'User registered successfully' });
  }
  async login(request: Request, response: Response) {
    await this.service.login(request.body);
    response.status(200).json({ message: 'Login successful' });
  }
}

export const authController = new AuthController();
