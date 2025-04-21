/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '@/db/index.js';
import { UserSelectSchema, usersTable } from '@/db/schema/user.schema.js';
import { eq } from 'drizzle-orm';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

class UserService {
  async create(
    userData: typeof usersTable.$inferInsert,
  ): Promise<UserSelectSchema[]> {
    const user = await db.insert(usersTable).values(userData).returning();
    return user;
  }
  async getAll(): Promise<User[]> {
    return db.select().from(usersTable);
  }

  async getById(id: string): Promise<User[]> {
    return db.select().from(usersTable).where(eq(usersTable.id, id));
  }

  async update(
    id: string,
    userData: typeof usersTable.$inferInsert,
  ): Promise<any> {
    const user = await db
      .update(usersTable)
      .set({ ...userData })
      .where(eq(usersTable.id, id))
      .returning({ id: usersTable.id });

    return user;
  }

  async delete(id: string): Promise<any> {
    await db.delete(usersTable).where(eq(usersTable.id, id));
  }
}
export const userService = new UserService();
