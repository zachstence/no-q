import { jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import type { InferSelectModel } from 'drizzle-orm';

import type { DenseBoard } from '$lib/Board';

import { id } from '../id';
import { rolls } from './rolls';
import { users } from './users';
import { solutions } from './solutions';

export const games = pgTable('games', {
	id: text('id').primaryKey().$defaultFn(id),
	creator: text('creator')
		.references(() => users.id)
		.notNull(),
	roll: text('roll')
		.references(() => rolls.id)
		.notNull(),
	board: jsonb('board').$type<DenseBoard>(),
	solution: text('solution').references(() => solutions.id),
	created_at: timestamp('created_at', { mode: 'date', withTimezone: true })
		.$defaultFn(() => new Date())
		.notNull()
});

export type Game = InferSelectModel<typeof games>;
