import { db } from '@/db/index.js';
import {
  RevenueInsertSchema,
  RevenueSelectSchema,
  revenuesTable,
} from '@/db/schema/revenue.schema.js';
import { BaseRepository } from '@/repositories/base.repository.js';
import { eq } from 'drizzle-orm';

class RevenueRepository implements BaseRepository<RevenueSelectSchema> {
  private readonly table;

  constructor() {
    this.table = revenuesTable;
  }

  async create(data: RevenueInsertSchema): Promise<RevenueSelectSchema[]> {
    const revenue = await db.insert(this.table).values(data).returning();
    return revenue;
  }

  async getCollection(): Promise<RevenueSelectSchema[]> {
    return db.select().from(this.table);
  }

  async getById(id: string): Promise<RevenueSelectSchema | undefined> {
    const [revenue] = await db
      .select()
      .from(revenuesTable)
      .where(eq(revenuesTable.id, id));
    return revenue;
  }

  async update(
    id: string,
    data: RevenueInsertSchema,
  ): Promise<{ id: string }[]> {
    const revenue = await db
      .update(this.table)
      .set({ ...data })
      .where(eq(this.table.id, id))
      .returning({ id: this.table.id });

    return revenue;
  }

  async delete(id: string): Promise<void> {
    await db.delete(this.table).where(eq(this.table.id, id));
  }
}
export const revenueRepository = new RevenueRepository();
