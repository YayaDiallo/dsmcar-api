import { activitiesTable } from '@/db/schema/activity.schema.js';
import { categoriesTable } from '@/db/schema/category.schema.js';
import {
  date,
  numeric,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import { z } from 'zod';

export const expensesTable = pgTable('expenses', {
  id: uuid().notNull().primaryKey().defaultRandom(),
  activityId: uuid()
    .references(() => activitiesTable.id)
    .notNull(),
  categoryId: uuid()
    .references(() => categoriesTable.id)
    .notNull(),
  type: varchar({ length: 255 }).notNull(),
  amount: numeric({ precision: 12, scale: 2 }).notNull(),
  date: date({ mode: 'string' }).notNull(),
  createdAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
});

export const expenseSelectSchema = createSelectSchema(expensesTable);
export const expenseInsertSchema = createInsertSchema(expensesTable);
export const expenseUpdateSchema = createUpdateSchema(expensesTable);

export type ExpenseInsertSchema = z.infer<typeof expenseInsertSchema>;
export type ExpenseSelectSchema = z.infer<typeof expenseSelectSchema>;
