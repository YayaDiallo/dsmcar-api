import {
  RevenueInsertSchema,
  RevenueSelectSchema,
} from '@/db/schema/revenue.schema.js';
import { revenueRepository } from '@/repositories/index.js';
import { BaseService } from '@/services/base.service.js';

class RevenueService extends BaseService<
  RevenueSelectSchema,
  RevenueInsertSchema
> {
  constructor() {
    super(revenueRepository);
  }
}

export const revenueService = new RevenueService();
