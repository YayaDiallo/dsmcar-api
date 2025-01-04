import {
  date,
  integer,
  numeric,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { categoryModel } from './category.schema.js';
import { activityModel } from './activity.schema.js';

export const expenseModel = pgTable('expenses', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  activityId: integer().references(() => activityModel.id),
  categoryId: integer().references(() => categoryModel.id),
  type: varchar({ length: 255 }).notNull(),
  amount: numeric({ precision: 12, scale: 2 }).notNull(),
  date: date({ mode: 'string' }).notNull(),
  createdAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
});
