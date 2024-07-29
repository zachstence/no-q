import { char, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { id } from '../id';
import { users } from './users';
import type { InferSelectModel } from 'drizzle-orm';

export const rolls = pgTable('rolls', {
	id: text('id').primaryKey().$defaultFn(id),
	letters: char('letters', { length: 1 }).array(12).notNull().unique(),
	discovered_by: text('discovered_by')
		.references(() => users.id)
		.notNull(),
	created_at: timestamp('created_at', { mode: 'date', withTimezone: true })
		.$defaultFn(() => new Date())
		.notNull()
});

export type Roll = InferSelectModel<typeof rolls>;
