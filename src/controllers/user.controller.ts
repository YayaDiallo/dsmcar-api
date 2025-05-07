import { userService } from '@/services/index.js';
import { BaseController } from './base.controller.js';

class UserController extends BaseController<typeof userService> {
  constructor() {
    super({
      path: '/users',
      service: userService,
    });
  }
}

export const userController = new UserController();
