import { transactionController } from '@/controllers/index.js';
import {
  transactionInsertSchema,
  transactionUpdateSchema,
} from '@/db/schema/transaction.schema.js';
import { ParamsWithId } from '@/interfaces/index.js';
import { assertAuthenticated, validateRequest } from '@/middlewares/index.js';
import { BaseRoute } from './base.route.js';

class TransactionRouter extends BaseRoute<typeof transactionController> {
  constructor() {
    super({ controller: transactionController });
  }

  protected initializeRoutes() {
    this.router.get(
      this.path,
      assertAuthenticated,
      this.bindController('getCollection'),
    );
    this.router.get(
      `${this.path}/:id`,
      assertAuthenticated,
      this.bindController('getById'),
    );
    this.router.post(
      this.path,
      assertAuthenticated,
      validateRequest({ body: transactionInsertSchema }),
      this.bindController('create'),
    );
    this.router.patch(
      `${this.path}/:id`,
      assertAuthenticated,
      validateRequest({ params: ParamsWithId, body: transactionUpdateSchema }),
      this.bindController('update'),
    );
    this.router.delete(
      `${this.path}/:id`,
      assertAuthenticated,
      this.bindController('delete'),
    );
  }
}

export const transactionRouter = new TransactionRouter().router;
