import { activitiesTable } from '@/db/schema/activity.schema.js';
import { categoriesTable } from '@/db/schema/category.schema.js';
import { kindEnum } from '@/db/schema/transaction.schema.js';
import {
  boolean,
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

export const frequencyEnum = pgEnum('frequency', [
  'daily',
  'weekly',
  'monthly',
  'yearly',
]);

export const recurringTransactionsTable = pgTable('recurringTransactions', {
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
  startDate: date({ mode: 'string' }).notNull(),
  endDate: date({ mode: 'string' }).notNull(),
  frequency: frequencyEnum().notNull(),
  isActive: boolean().default(true).notNull(),
  lastRunAt: timestamp({ mode: 'string' }),
  createdAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
});
export const recurringTransactionSelectSchema = createSelectSchema(
  recurringTransactionsTable,
);
export const recurringTransactionInsertSchema = createInsertSchema(
  recurringTransactionsTable,
);
export const recurringTransactionUpdateSchema = createUpdateSchema(
  recurringTransactionsTable,
);

export type RecurringTransactionInsertSchema = z.infer<
  typeof recurringTransactionInsertSchema
>;
export type RecurringTransactionSelectSchema = z.infer<
  typeof recurringTransactionSelectSchema
>;
