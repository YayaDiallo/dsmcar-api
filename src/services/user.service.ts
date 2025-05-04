import { UserInsertSchema, UserSelectSchema } from '@/db/schema/user.schema.js';
import { userRepository } from '@/repositories/index.js';
import { BaseService } from './base.service.js';

class UserService extends BaseService<UserSelectSchema, UserInsertSchema> {
  constructor() {
    super(userRepository);
  }
}

export const userService = new UserService();
