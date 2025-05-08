import { revenueController } from '@/controllers/index.js';
import {
  revenueInsertSchema,
  revenueUpdateSchema,
} from '@/db/schema/revenue.schema.js';
import { ParamsWithId } from '@/interfaces/index.js';
import { validateRequest } from '@/middlewares/index.js';
import { BaseRoute } from './base.route.js';

class RevenueRouter extends BaseRoute<typeof revenueController> {
  constructor() {
    super({ controller: revenueController });
  }

  protected initializeRoutes() {
    this.router.get(this.path, this.bindController('getCollection'));
    this.router.get(`${this.path}/:id`, this.bindController('getById'));
    this.router.post(
      this.path,
      validateRequest({ body: revenueInsertSchema }),
      this.bindController('create'),
    );
    this.router.patch(
      `${this.path}/:id`,
      validateRequest({ params: ParamsWithId, body: revenueUpdateSchema }),
      this.bindController('update'),
    );
    this.router.delete(`${this.path}/:id`, this.bindController('delete'));
  }
}

export const revenueRouter = new RevenueRouter().router;
