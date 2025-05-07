import { userController } from '@/controllers/index.js';
import { userInsertSchema, userUpdateSchema } from '@/db/schema/user.schema.js';
import { ParamsWithId } from '@/interfaces/index.js';
import { validateRequest } from '@/middlewares/index.js';
import express from 'express';

class UserRouter {
  private controller: typeof userController;
  public readonly router: express.Router;
  private path: string;

  constructor() {
    this.controller = userController;
    this.path = this.controller.path;
    this.router = express.Router();
    this.initializeRoutes();
  }

  private bindController<K extends keyof typeof userController>(methodName: K) {
    const method = this.controller[methodName];
    if (typeof method === 'function') {
      return method.bind(this.controller);
    }
    throw new Error(
      `Controller method ${String(methodName)} is not a function`,
    );
  }

  private initializeRoutes() {
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
export const userRouter = new UserRouter().router;
