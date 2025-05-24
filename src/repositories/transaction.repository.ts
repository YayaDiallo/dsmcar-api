import { db } from '@/db/index.js';
import {
  TransactionInsertSchema,
  TransactionSelectSchema,
  transactionsTable,
} from '@/db/schema/transaction.schema.js';
import { BaseRepository } from '@/repositories/base.repository.js';
import { eq } from 'drizzle-orm';

class TransactionRepository implements BaseRepository<TransactionSelectSchema> {
  private readonly table;

  constructor() {
    this.table = transactionsTable;
  }

  async create(
    data: TransactionInsertSchema,
  ): Promise<TransactionSelectSchema[]> {
    const car = await db.insert(this.table).values(data).returning();
    return car;
  }

  async getCollection(): Promise<TransactionSelectSchema[]> {
    return db.select().from(this.table);
  }

  async getById(id: string): Promise<TransactionSelectSchema | undefined> {
    const [car] = await db
      .select()
      .from(transactionsTable)
      .where(eq(transactionsTable.id, id));
    return car;
  }

  async update(
    id: string,
    data: TransactionInsertSchema,
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

export const transactionRepository = new TransactionRepository();
