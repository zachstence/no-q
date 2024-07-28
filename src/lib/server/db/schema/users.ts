import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: text('id').primaryKey(),
	username: text('username').notNull(),
	password_hash: text('password_hash').notNull(),
	created_at: timestamp('created_at', {
		mode: 'date',
		withTimezone: true
	}).$defaultFn(() => new Date())
});
