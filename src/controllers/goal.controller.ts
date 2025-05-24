import { goalService } from '@/services/index.js';
import { BaseController } from './base.controller.js';

class GoalController extends BaseController<typeof goalService> {
  constructor() {
    super({
      path: '/goals',
      service: goalService,
    });
  }
}

export const goalController = new GoalController();
