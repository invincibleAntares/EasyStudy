import { pgTable, serial, varchar, boolean } from 'drizzle-orm/pg-core';

export const USER_TABLE = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull(), 
isMember: boolean('is_member').default(false),
});
