import { activitiesTable } from '@/db/schema/activity.schema.js';
import { date, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const carsTable = pgTable('cars', {
  id: uuid().notNull().primaryKey().defaultRandom(),
  activityId: uuid()
    .references(() => activitiesTable.id)
    .notNull(),
  brand: varchar({ length: 255 }).notNull(),
  model: varchar({ length: 255 }).notNull(),
  plate: varchar({ length: 255 }).notNull(),
  year: date({ mode: 'string' }).notNull(),
  createdAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
});
