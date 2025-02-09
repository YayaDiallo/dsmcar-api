import { uuid, pgEnum, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';

export const roleEnum = pgEnum('role', ['admin', 'owner']);

export const usersTable = pgTable('users', {
  id: uuid().notNull().primaryKey().defaultRandom(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: roleEnum().default('owner').notNull(),
  createdAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
});

export const userInsertSchema = createInsertSchema(usersTable, {
  email: (schema) => schema.email(),
  password: (schema) => schema.min(6),
});
export const userUpdateSchema = createUpdateSchema(usersTable, {
  email: (schema) => schema.email(),
  password: (schema) => schema.min(6),
});
