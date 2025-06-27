import { authController } from '@/controllers/index.js';
import { userInsertSchema } from '@/db/schema/user.schema.js';
import {
  validateRequest,
  validateAuthRequest,
  assertAuthenticated,
} from '@/middlewares/index.js';
import { BaseRoute } from './base.route.js';
import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

class AuthRouter extends BaseRoute<typeof authController> {
  constructor() {
    super({ controller: authController });
  }

  protected initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      validateAuthRequest({ body: LoginSchema }),
      this.bindController('login'),
    );
    this.router.post(
      `${this.path}/logout`,
      assertAuthenticated,
      this.bindController('logout'),
    );
    this.router.post(
      `${this.path}/register`,
      validateRequest({ body: userInsertSchema }),
      this.bindController('register'),
    );
  }
}

export const authRouter = new AuthRouter().router;
