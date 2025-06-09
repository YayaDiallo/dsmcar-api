import { UserInsertSchema, UserSelectSchema } from '@/db/schema/user.schema.js';
import { Unauthenticated } from '@/errors/unauthenticated.js';
import { userRepository } from '@/repositories/index.js';
import { BaseService } from '@/services/base.service.js';

type UserRepositoryType = typeof userRepository;

class AuthService extends BaseService<
  UserSelectSchema,
  UserInsertSchema,
  UserRepositoryType
> {
  constructor() {
    super({ repository: userRepository });
  }

  async register(data: UserInsertSchema) {
    return this.repository.create(data);
  }

  // TODO: Implement proper password hashing and validation
  async login({ email, password }: { email: string; password: string }) {
    const user = await this.repository.getByEmail(email);
    if (password === user?.password) return user;

    throw new Unauthenticated({
      message: 'Invalid email and/or password.',
      statusCode: 401,
    });
  }
}

export const authService = new AuthService();
