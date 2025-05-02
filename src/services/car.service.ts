import { db } from '@/db/index.js';
import { CarSelectSchema, carsTable } from '@/db/schema/car.schema.js';
import { GetCollectionResponse } from '@/services/service.helper.js';
import { eq, count } from 'drizzle-orm';

class CarService {
  async create(
    carData: typeof carsTable.$inferInsert,
  ): Promise<CarSelectSchema[]> {
    const activity = await db.insert(carsTable).values(carData).returning();
    return activity;
  }
  async getCollection(): Promise<GetCollectionResponse<CarSelectSchema>> {
    const [rows, countResult] = await Promise.all([
      db.select().from(carsTable),
      db.select({ totalCount: count(carsTable.id) }).from(carsTable),
    ]);
    return {
      totalCount: countResult[0]?.totalCount ?? 0,
      rows,
    };
  }

  async getById(id: string): Promise<CarSelectSchema[]> {
    return db.select().from(carsTable).where(eq(carsTable.id, id));
  }

  async update(
    id: string,
    carData: typeof carsTable.$inferInsert,
  ): Promise<{ id: string }[]> {
    const activity = await db
      .update(carsTable)
      .set({ ...carData })
      .where(eq(carsTable.id, id))
      .returning({ id: carsTable.id });

    return activity;
  }

  async delete(id: string): Promise<void> {
    await db.delete(carsTable).where(eq(carsTable.id, id));
  }
}
export const carService = new CarService();
