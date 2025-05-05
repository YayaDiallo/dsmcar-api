import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import { z } from 'zod';

export const categoriesTable = pgTable('categories', {
  id: uuid().notNull().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  createdAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
});

export const categorySelectSchema = createSelectSchema(categoriesTable);
export const categoryInsertSchema = createInsertSchema(categoriesTable);
export const categoryUpdateSchema = createUpdateSchema(categoriesTable);

export type CategoryInsertSchema = z.infer<typeof categorySelectSchema>;
export type CategorySelectSchema = z.infer<typeof categorySelectSchema>;
