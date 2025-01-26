import { uuid, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const categoriesTable = pgTable('categories', {
  id: uuid().notNull().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  createdAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
});
