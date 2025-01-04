import {
  integer,
  numeric,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { activityModel } from './activity.schema.js';

export const revenueModel = pgTable('revenues', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  activityId: integer().references(() => activityModel.id),
  type: varchar({ length: 255 }).notNull(),
  amount: numeric({ precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
});
