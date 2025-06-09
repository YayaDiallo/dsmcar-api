import {
  ActivitySelectSchema,
  ActivityInsertSchema,
} from '@/db/schema/activity.schema.js';
import { activityRepository } from '@/repositories/index.js';
import { BaseService } from '@/services/base.service.js';

class ActivityService extends BaseService<
  ActivitySelectSchema,
  ActivityInsertSchema
> {
  constructor() {
    super({ repository: activityRepository });
  }
}

export const activityService = new ActivityService();
