import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { userModel } from './user.schema.js';

export const activityModel = pgTable('activities', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().references(() => userModel.id),
  companyName: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  createdAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
});
