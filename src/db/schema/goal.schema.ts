import { activitiesTable } from '@/db/schema/activity.schema.js';
import { frequencyEnum } from '@/db/schema/recurringTransaction.schema.js';
import {
  boolean,
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

export const goalsTable = pgTable('goals', {
  id: uuid().notNull().primaryKey().defaultRandom(),
  activityId: uuid()
    .references(() => activitiesTable.id)
    .notNull(),
  name: varchar({ length: 255 }),
  frequency: frequencyEnum().default('monthly').notNull(),
  targetAmount: numeric({ precision: 12, scale: 2 }).notNull(),
  startDate: date({ mode: 'string' }).notNull(),
  endDate: date({ mode: 'string' }).notNull(),
  completed: boolean().default(false).notNull(),
  createdAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
});

export const goalSelectSchema = createSelectSchema(goalsTable);
export const goalInsertSchema = createInsertSchema(goalsTable);
export const goalUpdateSchema = createUpdateSchema(goalsTable);

export type GoalInsertSchema = z.infer<typeof goalInsertSchema>;
export type GoalSelectSchema = z.infer<typeof goalSelectSchema>;
