import { pgTable, serial, varchar, boolean ,json } from 'drizzle-orm/pg-core';


export const USER_TABLE = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull(), 
isMember: boolean('is_member').default(false),
});


export const STUDY_MATERIAL_TABLE = pgTable('study_materials', {

         id: serial().primaryKey(),
   courseId: varchar().notNull(),
   courseType: varchar().notNull(),
   topic: varchar().notNull(),
   difficultyLevel: varchar().default('easy'),
   courseLayout: json(),
   createdBy: varchar().notNull(),
  status: varchar().default('Generating'),
});