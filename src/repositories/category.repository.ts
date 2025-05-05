import { db } from '@/db/index.js';
import {
  CategoryInsertSchema,
  CategorySelectSchema,
  categoriesTable,
} from '@/db/schema/category.schema.js';
import { BaseRepository } from '@/repositories/base.repository.js';
import { eq } from 'drizzle-orm';

class CategoryRepository implements BaseRepository<CategorySelectSchema> {
  private readonly table;

  constructor() {
    this.table = categoriesTable;
  }

  async create(data: CategoryInsertSchema): Promise<CategorySelectSchema[]> {
    const category = await db.insert(this.table).values(data).returning();
    return category;
  }

  async getCollection(): Promise<CategorySelectSchema[]> {
    return db.select().from(this.table);
  }
  async getById(id: string): Promise<CategorySelectSchema | undefined> {
    const [category] = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.id, id));
    return category;
  }
  async update(
    id: string,
    data: CategoryInsertSchema,
  ): Promise<{ id: string }[]> {
    const category = await db
      .update(this.table)
      .set({ ...data })
      .where(eq(this.table.id, id))
      .returning({ id: this.table.id });

    return category;
  }
  async delete(id: string): Promise<void> {
    await db.delete(this.table).where(eq(this.table.id, id));
  }
}
export const categoryRepository = new CategoryRepository();
