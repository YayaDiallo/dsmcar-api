import { activityController } from '@/controllers/index.js';
import { userInsertSchema, userUpdateSchema } from '@/db/schema/user.schema.js';
import { ParamsWithId } from '@/interfaces/index.js';
import { validateRequest } from '@/middlewares/index.js';
import { BaseRoute } from './base.route.js';

class ActivityRouter extends BaseRoute<typeof activityController> {
  constructor() {
    super({ controller: activityController });
  }

  protected initializeRoutes() {
    this.router.get(this.path, this.bindController('getCollection'));
    this.router.get(`${this.path}/:id`, this.bindController('getById'));
    this.router.post(
      this.path,
      validateRequest({ body: userInsertSchema }),
      this.bindController('create'),
    );
    this.router.patch(
      `${this.path}/:id`,
      validateRequest({ params: ParamsWithId, body: userUpdateSchema }),
      this.bindController('update'),
    );
    this.router.delete(`${this.path}/:id`, this.bindController('delete'));
  }
}

export const activityRouter = new ActivityRouter().router;
