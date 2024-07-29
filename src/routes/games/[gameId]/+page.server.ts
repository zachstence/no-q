import type { PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';

import { db, games } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const [game] = await db.select().from(games).where(eq(games.id, params.gameId)).limit(1);
	if (!game) return error(404, 'Game not found');

	return { game };
};
