import { activityService } from '@/services/index.js';
import { BaseController } from './base.controller.js';

class ActivityController extends BaseController<typeof activityService> {
  constructor() {
    super({
      path: '/activities',
      service: activityService,
    });
  }
}

export const activityController = new ActivityController();
