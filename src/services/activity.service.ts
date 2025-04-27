import {
  activitySelectSchema,
  activitiesTable,
} from '@/db/schema/activity.schema.js';
import { GetCollectionResponse } from '@/services/service.helper.js';
import { eq, count } from 'drizzle-orm';

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
  async getCollection(): Promise<GetCollectionResponse<ActivitySelectSchema>> {
    const [rows, countResult] = await Promise.all([
      db.select().from(activitiesTable),
      db
        .select({ totalCount: count(activitiesTable.id) })
        .from(activitiesTable),
    ]);
    return {
      totalCount: countResult[0]?.totalCount ?? 0,
      rows,
    };
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
