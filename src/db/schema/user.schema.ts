import { pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import { z } from 'zod';

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

export const userSelectSchema = createSelectSchema(usersTable);

export const userInsertSchema = createInsertSchema(usersTable, {
  email: (schema) => schema.email(),
  password: (schema) => schema.min(6),
}).strict();
export const userUpdateSchema = createUpdateSchema(usersTable, {
  email: (schema) => schema.email(),
  password: (schema) => schema.min(6),
}).strict();

export type UserInsertSchema = z.infer<typeof userInsertSchema>;
export type UserSelectSchema = z.infer<typeof userSelectSchema>;
