import { db } from '@/db/index.js';
import {
  ExpenseInsertSchema,
  ExpenseSelectSchema,
  expensesTable,
} from '@/db/schema/expense.schema.js';
import { BaseRepository } from '@/repositories/base.repository.js';
import { eq } from 'drizzle-orm';

class ExpenseRepository implements BaseRepository<ExpenseSelectSchema> {
  private readonly table;

  constructor() {
    this.table = expensesTable;
  }

  async create(data: ExpenseInsertSchema): Promise<ExpenseSelectSchema[]> {
    const expense = await db.insert(this.table).values(data).returning();
    return expense;
  }

  async getCollection(): Promise<ExpenseSelectSchema[]> {
    return db.select().from(this.table);
  }
  async getById(id: string): Promise<ExpenseSelectSchema | undefined> {
    const [expense] = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.id, id));
    return expense;
  }
  async update(
    id: string,
    data: ExpenseInsertSchema,
  ): Promise<{ id: string }[]> {
    const expense = await db
      .update(this.table)
      .set({ ...data })
      .where(eq(this.table.id, id))
      .returning({ id: this.table.id });

    return expense;
  }
  async delete(id: string): Promise<void> {
    await db.delete(this.table).where(eq(this.table.id, id));
  }
}

export const expenseRepository = new ExpenseRepository();
