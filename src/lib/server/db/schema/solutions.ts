import { jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { id } from '../id';
import { rolls } from './rolls';
import { users } from './users';

type Board = {
	[row: number]: {
		[col: number]: string;
	};
};

export const solutions = pgTable('solutions', {
	id: text('id').primaryKey().$defaultFn(id),
	roll: text('roll')
		.references(() => rolls.id)
		.notNull(),
	board: jsonb('solution').$type<Board>().notNull().unique(),
	discovered_by: text('discovered_by')
		.references(() => users.id)
		.notNull(),
	created_at: timestamp('created_at', { mode: 'date' }).$defaultFn(() => new Date())
});
