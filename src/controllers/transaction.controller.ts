import { transactionService } from '@/services/index.js';
import { BaseController } from './base.controller.js';

class TransactionController extends BaseController<typeof transactionService> {
  constructor() {
    super({
      path: '/transactions',
      service: transactionService,
    });
  }
}

export const transactionController = new TransactionController();
