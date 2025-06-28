import { categoryController } from '@/controllers/index.js';
import {
  categoryInsertSchema,
  categoryUpdateSchema,
} from '@/db/schema/category.schema.js';
import { ParamsWithId } from '@/interfaces/index.js';
import { assertAuthenticated, validateRequest } from '@/middlewares/index.js';
import { BaseRoute } from './base.route.js';

class CategoryRouter extends BaseRoute<typeof categoryController> {
  constructor() {
    super({ controller: categoryController });
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
      validateRequest({ body: categoryInsertSchema }),
      this.bindController('create'),
    );
    this.router.patch(
      `${this.path}/:id`,
      assertAuthenticated,
      validateRequest({ params: ParamsWithId, body: categoryUpdateSchema }),
      this.bindController('update'),
    );
    this.router.delete(
      `${this.path}/:id`,
      assertAuthenticated,
      this.bindController('delete'),
    );
  }
}

export const categoryRouter = new CategoryRouter().router;
