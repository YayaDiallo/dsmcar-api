import { revenueService } from '@/services/index.js';
import { BaseController } from './base.controller.js';

class RevenueController extends BaseController<typeof revenueService> {
  constructor() {
    super({
      path: '/revenues',
      service: revenueService,
    });
  }
}

export const revenueController = new RevenueController();
