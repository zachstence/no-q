import { jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import type { InferSelectModel } from 'drizzle-orm';

import type { DenseBoard } from '$lib/Board';

import { id } from '../id';
import { users } from './users';

export const solutions = pgTable('solutions', {
	id: text('id').primaryKey().$defaultFn(id),
	board: jsonb('board').$type<DenseBoard>().notNull().unique(),
	discovered_by: text('discovered_by')
		.references(() => users.id)
		.notNull(),
	created_at: timestamp('created_at', { mode: 'date', withTimezone: true })
		.$defaultFn(() => new Date())
		.notNull()
});

export type Solution = InferSelectModel<typeof solutions>;
