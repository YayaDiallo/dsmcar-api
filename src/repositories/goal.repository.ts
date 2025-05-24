import { db } from '@/db/index.js';
import {
  GoalInsertSchema,
  GoalSelectSchema,
  goalsTable,
} from '@/db/schema/goal.schema.js';
import { BaseRepository } from '@/repositories/base.repository.js';
import { eq } from 'drizzle-orm';

class GoalRepository implements BaseRepository<GoalSelectSchema> {
  private readonly table;

  constructor() {
    this.table = goalsTable;
  }

  async create(data: GoalInsertSchema): Promise<GoalSelectSchema[]> {
    const car = await db.insert(this.table).values(data).returning();
    return car;
  }

  async getCollection(): Promise<GoalSelectSchema[]> {
    return db.select().from(this.table);
  }

  async getById(id: string): Promise<GoalSelectSchema | undefined> {
    const [car] = await db
      .select()
      .from(goalsTable)
      .where(eq(goalsTable.id, id));
    return car;
  }

  async update(id: string, data: GoalInsertSchema): Promise<{ id: string }[]> {
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

export const goalRepository = new GoalRepository();
