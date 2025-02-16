import { usersTable } from '@/db/schema/user.schema.js';
import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

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
