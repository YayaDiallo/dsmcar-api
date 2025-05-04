import { db } from '@/db/index.js';
import {
  ActivityInsertSchema,
  ActivitySelectSchema,
  activitiesTable,
} from '@/db/schema/activity.schema.js';
import { BaseRepository } from '@/repositories/base.repository.js';
import { eq } from 'drizzle-orm';

class ActivityRepository implements BaseRepository<ActivitySelectSchema> {
  private readonly table;

  constructor() {
    this.table = activitiesTable;
  }
  async create(data: ActivityInsertSchema): Promise<ActivitySelectSchema[]> {
    const user = await db.insert(this.table).values(data).returning();
    return user;
  }

  async getCollection(): Promise<ActivitySelectSchema[]> {
    return db.select().from(this.table);
  }

  async getById(id: string): Promise<ActivitySelectSchema | undefined> {
    const [user] = await db
      .select()
      .from(activitiesTable)
      .where(eq(activitiesTable.id, id));
    return user;
  }

  async update(
    id: string,
    userData: ActivityInsertSchema,
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

export const activityRepository = new ActivityRepository();
