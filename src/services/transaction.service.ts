import {
  TransactionSelectSchema,
  TransactionInsertSchema,
} from '@/db/schema/transaction.schema.js';
import { transactionRepository } from '@/repositories/index.js';
import { BaseService } from '@/services/base.service.js';

class TransactionService extends BaseService<
  TransactionSelectSchema,
  TransactionInsertSchema
> {
  constructor() {
    super({ repository: transactionRepository });
  }
}

export const transactionService = new TransactionService();
