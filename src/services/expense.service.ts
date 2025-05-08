import {
  ExpenseInsertSchema,
  ExpenseSelectSchema,
} from '@/db/schema/expense.schema.js';
import { expenseRepository } from '@/repositories/index.js';
import { BaseService } from '@/services/base.service.js';

class ExpenseService extends BaseService<
  ExpenseSelectSchema,
  ExpenseInsertSchema
> {
  constructor() {
    super(expenseRepository);
  }
}

export const expenseService = new ExpenseService();
