import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db, games, rolls, type Game, type Roll } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { rollLetters } from '$lib/rollLetters';

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

export const actions: Actions = {
	play: async ({ locals, fetch }) => {
		if (!locals.session) return redirect(302, '/sign-in');

		const letters = rollLetters();

		const r1 = await fetch('/api/rolls', { method: 'POST', body: JSON.stringify({ letters }) });
		const roll = (await r1.json()) as Roll;

		const r2 = await fetch('/api/games', {
			method: 'POST',
			body: JSON.stringify({ rollId: roll.id })
		});
		const game = (await r2.json()) as Game;

		return redirect(303, `/play/${game.id}`);
	}
};
