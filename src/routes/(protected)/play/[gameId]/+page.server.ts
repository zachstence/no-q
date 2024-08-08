import type { PageServerLoad } from './$types';
import { and, eq } from 'drizzle-orm';

import { db, games, rolls } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.session) return error(401);

	const [result] = await db
		.select({ game: games, roll: rolls })
		.from(games)
		.where(and(eq(games.id, params.gameId), eq(games.creator, locals.session.userId)))
		.innerJoin(rolls, eq(games.roll, rolls.id));

	if (!result) return error(404, 'Game not found');

	return {
		game: {
			...result.game,
			roll: result.roll
		}
	};
};
