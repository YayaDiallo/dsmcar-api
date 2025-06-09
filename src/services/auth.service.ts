import { UserInsertSchema, UserSelectSchema } from '@/db/schema/user.schema.js';
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

  async login({ email, password }: { email: string; password: string }) {
    const token = { id: '', token: '' };
    const user = await this.repository.getByEmail(email);
    if (password === user?.password) {
      token.id = user.id;
      token.token = '123';
      return { user, token };
    }
    throw new Error('Invalid credentials');
  }
}

export const authService = new AuthService();
