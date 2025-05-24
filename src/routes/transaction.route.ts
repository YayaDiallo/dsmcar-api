import { transactionController } from '@/controllers/index.js';
import {
  transactionInsertSchema,
  transactionUpdateSchema,
} from '@/db/schema/transaction.schema.js';
import { ParamsWithId } from '@/interfaces/index.js';
import { validateRequest } from '@/middlewares/index.js';
import { BaseRoute } from './base.route.js';

class TransactionRouter extends BaseRoute<typeof transactionController> {
  constructor() {
    super({ controller: transactionController });
  }

  protected initializeRoutes() {
    this.router.get(this.path, this.bindController('getCollection'));
    this.router.get(`${this.path}/:id`, this.bindController('getById'));
    this.router.post(
      this.path,
      validateRequest({ body: transactionInsertSchema }),
      this.bindController('create'),
    );
    this.router.patch(
      `${this.path}/:id`,
      validateRequest({ params: ParamsWithId, body: transactionUpdateSchema }),
      this.bindController('update'),
    );
    this.router.delete(`${this.path}/:id`, this.bindController('delete'));
  }
}

export const transactionRouter = new TransactionRouter().router;
