import { db } from '@/db/index.js';
import {
  UserInsertSchema,
  UserSelectSchema,
  usersTable,
} from '@/db/schema/user.schema.js';
import { BaseRepository } from '@/repositories/base.repository.js';
import { eq } from 'drizzle-orm';

class UserRepository implements BaseRepository<UserSelectSchema> {
  private readonly table;

  constructor() {
    this.table = usersTable;
  }
  async create(data: UserInsertSchema): Promise<UserSelectSchema[]> {
    const user = await db.insert(this.table).values(data).returning();
    return user;
  }

  async getCollection(): Promise<UserSelectSchema[]> {
    return db.select().from(this.table);
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
    userData: UserInsertSchema,
  ): Promise<{ id: string }[]> {
    const user = await db
      .update(this.table)
      .set({ ...userData })
      .where(eq(this.table.id, id))
      .returning({ id: this.table.id });

    return user;
  }

  async delete(id: string): Promise<void> {
    await db.delete(this.table).where(eq(this.table.id, id));
  }
}

export const userRepository = new UserRepository();
