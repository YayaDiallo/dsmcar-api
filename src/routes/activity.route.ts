import { activityController } from '@/controllers/index.js';
import {
  activityInsertSchema,
  activityUpdateSchema,
} from '@/db/schema/activity.schema.js';
import { ParamsWithId } from '@/interfaces/index.js';
import { assertAuthenticated, validateRequest } from '@/middlewares/index.js';
import { BaseRoute } from './base.route.js';

class ActivityRouter extends BaseRoute<typeof activityController> {
  constructor() {
    super({ controller: activityController });
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
      validateRequest({ body: activityInsertSchema }),
      this.bindController('create'),
    );
    this.router.patch(
      `${this.path}/:id`,
      assertAuthenticated,
      validateRequest({ params: ParamsWithId, body: activityUpdateSchema }),
      this.bindController('update'),
    );
    this.router.delete(
      `${this.path}/:id`,
      assertAuthenticated,
      this.bindController('delete'),
    );
  }
}

export const activityRouter = new ActivityRouter().router;
