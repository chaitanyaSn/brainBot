
import { boolean, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const USER_Table = pgTable("users", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  isMember:boolean().default(false)
});

export const STUDY_MATERIAL_TABLE=pgTable("studyMaterial",{
  id:serial().primaryKey(),
  courseId:varchar().notNull(),
  courseType:varchar().notNull(),
  topic:varchar().notNull(),
  difficultyLevel:varchar({ 
    enum: ['Beginner', 'Intermediate', 'Pro'] 
  }).default('Intermediate'),
  courseLayout:json(),
  createdBy:varchar().notNull()



})