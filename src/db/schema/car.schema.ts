import { activitiesTable } from '@/db/schema/activity.schema.js';
import { date, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import { z } from 'zod';

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

export const carSelectSchema = createSelectSchema(carsTable);
export const carInsertSchema = createInsertSchema(carsTable);
export const carUpdateSchema = createUpdateSchema(carsTable);

export type CarInsertSchema = z.infer<typeof carInsertSchema>;
export type CarSelectSchema = z.infer<typeof carSelectSchema>;
