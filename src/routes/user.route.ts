import { userController } from '@/controllers/index.js';
import { userInsertSchema, userUpdateSchema } from '@/db/schema/user.schema.js';
import { ParamsWithId } from '@/interfaces/index.js';
import { assertAuthenticated, validateRequest } from '@/middlewares/index.js';
import { BaseRoute } from './base.route.js';

class UserRouter extends BaseRoute<typeof userController> {
  constructor() {
    super({ controller: userController });
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
      validateRequest({ body: userInsertSchema }),
      this.bindController('create'),
    );
    this.router.patch(
      `${this.path}/:id`,
      assertAuthenticated,
      validateRequest({ params: ParamsWithId, body: userUpdateSchema }),
      this.bindController('update'),
    );
    this.router.delete(
      `${this.path}/:id`,
      assertAuthenticated,
      this.bindController('delete'),
    );
  }
}

export const userRouter = new UserRouter().router;
