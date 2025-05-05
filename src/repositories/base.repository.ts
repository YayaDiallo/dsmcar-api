import { db } from '@/db/index.js';
import { PgTable, TableConfig } from 'drizzle-orm/pg-core';
import { eq, InferInsertModel, InferSelectModel } from 'drizzle-orm';

export interface BaseRepository<T, InsertSchema = T> {
  create(data: InsertSchema): Promise<T[]>;
  getCollection(): Promise<T[]>;
  getById(id: string): Promise<T | undefined>;
  update(id: string, data: InsertSchema): Promise<{ id: string }[]>;
  delete(id: string): Promise<void>;
}

export class GenericRepository<Schema extends PgTable<TableConfig>>
  implements BaseRepository<InferSelectModel<Schema>, InferInsertModel<Schema>>
{
  protected schema: Schema;

  constructor(schema: Schema) {
    this.schema = schema;
  }

  async create(
    data: InferInsertModel<Schema>,
  ): Promise<InferSelectModel<Schema>[]> {
    const result = await db.insert(this.schema).values(data).returning();
    return result as unknown as Schema[];
  }

  async getCollection(): Promise<InferSelectModel<Schema>[]> {
    return db.select().from(this.schema);
  }

  async getById(id: string): Promise<InferSelectModel<Schema> | undefined> {
    const [result] = await db
      .select()
      .from(this.schema)
      .where(eq(this.schema.id, id));
    return result;
  }

  async update(
    id: string,
    data: InferInsertModel<Schema>,
  ): Promise<{ id: string }[]> {
    return db
      .update(this.schema)
      .set({ ...data })
      .where(eq(this.schema.id, id))
      .returning({ id: this.schema.id });
  }

  async delete(id: string): Promise<void> {
    await db.delete(this.schema).where(eq(this.schema.id, id));
  }
}
