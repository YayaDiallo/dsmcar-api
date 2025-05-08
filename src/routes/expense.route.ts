import { expenseController } from '@/controllers/index.js';
import {
  expenseInsertSchema,
  expenseUpdateSchema,
} from '@/db/schema/expense.schema.js';
import { ParamsWithId } from '@/interfaces/index.js';
import { validateRequest } from '@/middlewares/index.js';
import { BaseRoute } from './base.route.js';

class ExpenseRouter extends BaseRoute<typeof expenseController> {
  constructor() {
    super({ controller: expenseController });
  }

  protected initializeRoutes() {
    this.router.get(this.path, this.bindController('getCollection'));
    this.router.get(`${this.path}/:id`, this.bindController('getById'));
    this.router.post(
      this.path,
      validateRequest({ body: expenseInsertSchema }),
      this.bindController('create'),
    );
    this.router.patch(
      `${this.path}/:id`,
      validateRequest({ params: ParamsWithId, body: expenseUpdateSchema }),
      this.bindController('update'),
    );
    this.router.delete(`${this.path}/:id`, this.bindController('delete'));
  }
}

export const expenseRouter = new ExpenseRouter().router;
