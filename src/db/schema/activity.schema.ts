import { usersTable } from '@/db/schema/user.schema.js';
import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import { z } from 'zod';

export const activitiesTable = pgTable('activities', {
  id: uuid().notNull().primaryKey().defaultRandom(),
  userId: uuid()
    .references(() => usersTable.id)
    .notNull(),
  companyName: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  createdAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
});

export const activitySelectSchema = createSelectSchema(activitiesTable);
export const activityInsertSchema = createInsertSchema(activitiesTable);
export const activityUpdateSchema = createUpdateSchema(activitiesTable);

export type ActivityInsertSchema = z.infer<typeof activitySelectSchema>;
export type ActivitySelectSchema = z.infer<typeof activitySelectSchema>;
