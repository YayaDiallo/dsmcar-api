import { db } from '@/db/index.js';
import {
  RecurringTransactionInsertSchema,
  RecurringTransactionSelectSchema,
  recurringTransactionsTable,
} from '@/db/schema/recurringTransaction.schema.js';
import { BaseRepository } from '@/repositories/base.repository.js';
import { eq } from 'drizzle-orm';

class RecurringTransactionRepository
  implements BaseRepository<RecurringTransactionSelectSchema>
{
  private readonly table;

  constructor() {
    this.table = recurringTransactionsTable;
  }

  async create(
    data: RecurringTransactionInsertSchema,
  ): Promise<RecurringTransactionSelectSchema[]> {
    const car = await db.insert(this.table).values(data).returning();
    return car;
  }

  async getCollection(): Promise<RecurringTransactionSelectSchema[]> {
    return db.select().from(this.table);
  }

  async getById(
    id: string,
  ): Promise<RecurringTransactionSelectSchema | undefined> {
    const [car] = await db
      .select()
      .from(recurringTransactionsTable)
      .where(eq(recurringTransactionsTable.id, id));
    return car;
  }

  async update(
    id: string,
    data: RecurringTransactionInsertSchema,
  ): Promise<{ id: string }[]> {
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

export const recurringTransactionRepository =
  new RecurringTransactionRepository();
