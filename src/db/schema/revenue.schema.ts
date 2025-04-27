import { activitiesTable } from '@/db/schema/index.js';
import {
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

export const revenuesTable = pgTable('revenues', {
  id: uuid().notNull().primaryKey().defaultRandom(),
  activityId: uuid()
    .references(() => activitiesTable.id)
    .notNull(),
  type: varchar({ length: 255 }).notNull(),
  amount: numeric({ precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
});

export const revenueSelectSchema = createSelectSchema(revenuesTable);
export const revenueInsertSchema = createInsertSchema(revenuesTable);
export const revenueUpdateSchema = createUpdateSchema(revenuesTable);

export type RevenueSelectSchema = z.infer<typeof revenueSelectSchema>;
