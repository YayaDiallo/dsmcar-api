import {
  ActivitySelectSchema,
  ActivityInsertSchema,
} from '@/db/schema/activity.schema.js';
import { activityRepository } from '@/repositories/activity.repository.js';
import { BaseService } from '@/services/base.service.js';

class ActivityService extends BaseService<
  ActivitySelectSchema,
  ActivityInsertSchema
> {
  constructor() {
    super(activityRepository);
  }
}

export const activityService = new ActivityService();
