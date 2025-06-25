import { UserInsertSchema, UserSelectSchema } from '@/db/schema/user.schema.js';
import { Unauthenticated } from '@/errors/unauthenticated.js';
import { userRepository } from '@/repositories/index.js';
import { BaseService } from '@/services/base.service.js';
import bcrypt from 'bcryptjs';

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

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
    const hashedPassword = await hashPassword(data.password);
    return this.repository.create({ ...data, password: hashedPassword });
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.repository.getByEmail(email);
    const isPasswordValid =
      user && (await bcrypt.compare(password, user.password));
    if (user && isPasswordValid) return user;

    throw new Unauthenticated({
      message: 'Invalid email and/or password.',
      statusCode: 401,
    });
  }
}

export const authService = new AuthService();
