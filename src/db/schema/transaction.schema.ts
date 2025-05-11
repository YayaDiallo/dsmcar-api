import { activitiesTable } from '@/db/schema/activity.schema.js';
import { categoriesTable } from '@/db/schema/category.schema.js';
import {
  date,
  numeric,
  pgEnum,
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

export const kindEnum = pgEnum('kind', ['expense', 'income']);

export const transactionsTable = pgTable('transactions', {
  id: uuid().notNull().primaryKey().defaultRandom(),
  activityId: uuid()
    .references(() => activitiesTable.id)
    .notNull(),
  categoryId: uuid()
    .references(() => categoriesTable.id)
    .notNull(),
  name: varchar({ length: 255 }).notNull(),
  kind: kindEnum().default('expense').notNull(),
  amount: numeric({ precision: 12, scale: 2 }).notNull(),
  date: date({ mode: 'string' }).notNull(),
  createdAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
});

export const transactionSelectSchema = createSelectSchema(transactionsTable);
export const transactionInsertSchema = createInsertSchema(transactionsTable);
export const transactionUpdateSchema = createUpdateSchema(transactionsTable);

export type TransactionInsertSchema = z.infer<typeof transactionSelectSchema>;
export type TransactionSelectSchema = z.infer<typeof transactionSelectSchema>;
