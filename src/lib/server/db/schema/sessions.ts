import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';
import { id } from '../id';

export const sessions = pgTable('session', {
	id: text('id').primaryKey().$defaultFn(id),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', {
		mode: 'date',
		withTimezone: true
	}).notNull()
});
