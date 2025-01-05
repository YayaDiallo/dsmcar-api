import {
  date,
  integer,
  numeric,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { categoriesTable } from './category.schema.js';
import { activitiesTable } from './activity.schema.js';

export const expensesTable = pgTable('expenses', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  activityId: integer().references(() => activitiesTable.id),
  categoryId: integer().references(() => categoriesTable.id),
  type: varchar({ length: 255 }).notNull(),
  amount: numeric({ precision: 12, scale: 2 }).notNull(),
  date: date({ mode: 'string' }).notNull(),
  createdAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
});
