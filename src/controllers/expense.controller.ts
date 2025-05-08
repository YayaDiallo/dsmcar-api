import { expenseService } from '@/services/index.js';
import { BaseController } from './base.controller.js';

class ExpenseController extends BaseController<typeof expenseService> {
  constructor() {
    super({
      path: '/expenses',
      service: expenseService,
    });
  }
}

export const expenseController = new ExpenseController();
