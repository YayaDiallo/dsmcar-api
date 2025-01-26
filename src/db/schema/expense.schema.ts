import {
  uuid,
  date,
  numeric,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { categoriesTable } from './category.schema.js';
import { activitiesTable } from './activity.schema.js';

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
