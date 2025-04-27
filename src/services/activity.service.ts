import { db } from '@/db/index.js';
import {
  ActivitySelectSchema,
  activitiesTable,
} from '@/db/schema/activity.schema.js';
import { eq } from 'drizzle-orm';

class ActivityService {
  async create(
    activityData: typeof activitiesTable.$inferInsert,
  ): Promise<ActivitySelectSchema[]> {
    const activity = await db
      .insert(activitiesTable)
      .values(activityData)
      .returning();
    return activity;
  }
  async getAll(): Promise<ActivitySelectSchema[]> {
    return db.select().from(activitiesTable);
  }

  async getById(id: string): Promise<ActivitySelectSchema[]> {
    return db.select().from(activitiesTable).where(eq(activitiesTable.id, id));
  }

  async update(
    id: string,
    activityData: typeof activitiesTable.$inferInsert,
  ): Promise<{ id: string }[]> {
    const activity = await db
      .update(activitiesTable)
      .set({ ...activityData })
      .where(eq(activitiesTable.id, id))
      .returning({ id: activitiesTable.id });

    return activity;
  }

  async delete(id: string): Promise<void> {
    await db.delete(activitiesTable).where(eq(activitiesTable.id, id));
  }
}
export const activityService = new ActivityService();
