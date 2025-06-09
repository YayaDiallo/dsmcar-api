import { GoalSelectSchema, GoalInsertSchema } from '@/db/schema/goal.schema.js';
import { goalRepository } from '@/repositories/index.js';
import { BaseService } from '@/services/base.service.js';

class GoalService extends BaseService<GoalSelectSchema, GoalInsertSchema> {
  constructor() {
    super({ repository: goalRepository });
  }
}

export const goalService = new GoalService();
