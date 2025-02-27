import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  email: text('email').unique().notNull(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const certificates = sqliteTable('certificates', {
  id: integer('id').primaryKey(),
  customer_Name: text('customer_name').notNull(),
  site_Location: text('site_location').notNull(),
  make_Model: text('make_model').notNull(),
  range: text('range').notNull(),
  serial_No: text('serial_no').notNull(),
  calibration_Gas: text('calibration_gas').notNull(),
  gas_Canister_Details: text('gas_canister_details').notNull(),
  date_Of_Calibration: text('date_of_calibration').notNull(),
  calibration_Due_Date: text('calibration_due_date').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertCertificate = typeof certificates.$inferInsert;
export type SelectCertificate = typeof certificates.$inferSelect;
