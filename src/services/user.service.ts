import { db } from '@/db/index.js';
import { UserSelectSchema, usersTable } from '@/db/schema/user.schema.js';
import { GetCollectionResponse } from '@/services/service.helper.js';
import { eq, count } from 'drizzle-orm';

class UserService {
  async create(
    userData: typeof usersTable.$inferInsert,
  ): Promise<UserSelectSchema[]> {
    const user = await db.insert(usersTable).values(userData).returning();
    return user;
  }
  async getCollection(): Promise<GetCollectionResponse<UserSelectSchema>> {
    const [rows, countResult] = await Promise.all([
      db.select().from(usersTable),
      db.select({ totalCount: count(usersTable.id) }).from(usersTable),
    ]);

    return {
      totalCount: countResult[0]?.totalCount ?? 0,
      rows,
    };
  }

  async getById(id: string): Promise<UserSelectSchema | undefined> {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));
    return user;
  }

  async update(
    id: string,
    userData: typeof usersTable.$inferInsert,
  ): Promise<{ id: string }[]> {
    const user = await db
      .update(usersTable)
      .set({ ...userData })
      .where(eq(usersTable.id, id))
      .returning({ id: usersTable.id });

    return user;
  }

  async delete(id: string): Promise<void> {
    await db.delete(usersTable).where(eq(usersTable.id, id));
  }
}
export const userService = new UserService();
