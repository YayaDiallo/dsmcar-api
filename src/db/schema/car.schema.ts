import {
  date,
  integer,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { activitiesTable } from './activity.schema.js';

export const carsTable = pgTable('cars', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  activityId: integer().references(() => activitiesTable.id),
  brand: varchar({ length: 255 }).notNull(),
  model: varchar({ length: 255 }).notNull(),
  plate: varchar({ length: 255 }).notNull(),
  year: date({ mode: 'string' }).notNull(),
  createdAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
});
