import { carController } from '@/controllers/index.js';
import { carInsertSchema, carUpdateSchema } from '@/db/schema/car.schema.js';
import { ParamsWithId } from '@/interfaces/index.js';
import { validateRequest } from '@/middlewares/index.js';
import { BaseRoute } from './base.route.js';

class CarRouter extends BaseRoute<typeof carController> {
  constructor() {
    super({ controller: carController });
  }

  protected initializeRoutes() {
    this.router.get(this.path, this.bindController('getCollection'));
    this.router.get(`${this.path}/:id`, this.bindController('getById'));
    this.router.post(
      this.path,
      validateRequest({ body: carInsertSchema }),
      this.bindController('create'),
    );
    this.router.patch(
      `${this.path}/:id`,
      validateRequest({ params: ParamsWithId, body: carUpdateSchema }),
      this.bindController('update'),
    );
    this.router.delete(`${this.path}/:id`, this.bindController('delete'));
  }
}

export const carRouter = new CarRouter().router;
