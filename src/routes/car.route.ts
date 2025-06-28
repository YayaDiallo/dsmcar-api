import { carController } from '@/controllers/index.js';
import { carInsertSchema, carUpdateSchema } from '@/db/schema/car.schema.js';
import { ParamsWithId } from '@/interfaces/index.js';
import { assertAuthenticated, validateRequest } from '@/middlewares/index.js';
import { BaseRoute } from './base.route.js';

class CarRouter extends BaseRoute<typeof carController> {
  constructor() {
    super({ controller: carController });
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
      validateRequest({ body: carInsertSchema }),
      this.bindController('create'),
    );
    this.router.patch(
      `${this.path}/:id`,
      assertAuthenticated,
      validateRequest({ params: ParamsWithId, body: carUpdateSchema }),
      this.bindController('update'),
    );
    this.router.delete(
      `${this.path}/:id`,
      assertAuthenticated,
      this.bindController('delete'),
    );
  }
}

export const carRouter = new CarRouter().router;
