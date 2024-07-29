import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { id } from '../id';

export const users = pgTable('users', {
	id: text('id').primaryKey().$defaultFn(id),
	username: text('username').notNull(),
	password_hash: text('password_hash').notNull(),
	created_at: timestamp('created_at', {
		mode: 'date',
		withTimezone: true
	}).$defaultFn(() => new Date())
});
