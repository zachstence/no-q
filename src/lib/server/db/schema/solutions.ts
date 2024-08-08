import { jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { id } from '../id';
import { users } from './users';
import type { InferSelectModel } from 'drizzle-orm';

type Board = {
	[row: number]: {
		[col: number]: string;
	};
};

export const solutions = pgTable('solutions', {
	id: text('id').primaryKey().$defaultFn(id),
	board: jsonb('board').$type<Board>().notNull().unique(),
	discovered_by: text('discovered_by')
		.references(() => users.id)
		.notNull(),
	created_at: timestamp('created_at', { mode: 'date', withTimezone: true })
		.$defaultFn(() => new Date())
		.notNull()
});

export type Solution = InferSelectModel<typeof solutions>;
