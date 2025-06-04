import { authController } from '@/controllers/index.js';
import { userInsertSchema } from '@/db/schema/user.schema.js';
import { validateRequest } from '@/middlewares/index.js';
import { BaseRoute } from './base.route.js';

class AuthRouter extends BaseRoute<typeof authController> {
  constructor() {
    super({ controller: authController });
  }

  protected initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      validateRequest({ body: userInsertSchema }),
      this.bindController('login'),
    );
    this.router.post(
      `${this.path}/register`,
      validateRequest({ body: userInsertSchema }),
      this.bindController('register'),
    );
  }
}

export const authRouter = new AuthRouter().router;
