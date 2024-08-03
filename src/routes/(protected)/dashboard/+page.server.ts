import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db, games, rolls } from '$lib/server/db';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.session) return redirect(302, '/sign-in');

	const result = await db
		.select({ game: games, roll: rolls })
		.from(games)
		.where(eq(games.creator, locals.session.userId))
		.innerJoin(rolls, eq(games.roll, rolls.id));

	const userGames = result.map(({ game, roll }) => ({
		...game,
		roll
	}));

	return { games: userGames };
};
