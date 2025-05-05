import { db } from '@/db/index.js';
import {
  CarInsertSchema,
  CarSelectSchema,
  carsTable,
} from '@/db/schema/car.schema.js';
import { BaseRepository } from '@/repositories/base.repository.js';
import { eq } from 'drizzle-orm';

class CarRepository implements BaseRepository<CarSelectSchema> {
  private readonly table;

  constructor() {
    this.table = carsTable;
  }

  async create(data: CarInsertSchema): Promise<CarSelectSchema[]> {
    const car = await db.insert(this.table).values(data).returning();
    return car;
  }

  async getCollection(): Promise<CarSelectSchema[]> {
    return db.select().from(this.table);
  }

  async getById(id: string): Promise<CarSelectSchema | undefined> {
    const [car] = await db.select().from(carsTable).where(eq(carsTable.id, id));
    return car;
  }

  async update(id: string, data: CarInsertSchema): Promise<{ id: string }[]> {
    const user = await db
      .update(this.table)
      .set({ ...data })
      .where(eq(this.table.id, id))
      .returning({ id: this.table.id });

    return user;
  }

  async delete(id: string): Promise<void> {
    await db.delete(this.table).where(eq(this.table.id, id));
  }
}

export const carRepository = new CarRepository();
