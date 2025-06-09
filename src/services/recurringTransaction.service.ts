import {
  RecurringTransactionSelectSchema,
  RecurringTransactionInsertSchema,
} from '@/db/schema/recurringTransaction.schema.js';
import { recurringTransactionRepository } from '@/repositories/index.js';
import { BaseService } from '@/services/base.service.js';

class RecurringTransactionService extends BaseService<
  RecurringTransactionSelectSchema,
  RecurringTransactionInsertSchema
> {
  constructor() {
    super({ repository: recurringTransactionRepository });
  }
}

export const recurringTransactionService = new RecurringTransactionService();
