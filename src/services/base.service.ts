import { db } from '@/db/index.js';
import { eq } from 'drizzle-orm';
import { PgTable, PgColumn } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export class BaseService<
  T extends PgTable & { id: PgColumn },
  S extends z.ZodTypeAny,
> {
  constructor(
    protected readonly table: T,
    protected readonly schema: S,
  ) {
    this.table = table;
    this.schema = schema;
  }

  async create(data: T['$inferInsert']): Promise<z.infer<S>[]> {
    const result = await db.insert(this.table).values(data).returning();
    return result;
  }

  async getAll(): Promise<z.infer<S>[]> {
    return db.select().from(this.table);
  }

  async getById(id: string): Promise<z.infer<S>[]> {
    return db
      .select()
      .from(this.table)
      .where(eq(this.table.id as any, id));
  }

  async update(
    id: string,
    data: Partial<T['$inferInsert']>,
  ): Promise<{ id: string }[]> {
    const result = await db
      .update(this.table)
      .set(data)
      .where(eq(this.table.id, id))
      .returning({ id: this.table.id });
    return result;
  }

  async delete(id: string): Promise<void> {
    await db.delete(this.table).where(eq(this.table.id, id)).execute();
  }
}
