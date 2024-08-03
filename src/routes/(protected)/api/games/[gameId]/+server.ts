import { db, games } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params, locals }) => {
	if (!locals.session) return error(401);

	const { gameId } = params;
	const [game] = await db.select().from(games).where(eq(games.id, gameId)).limit(1);
	if (!game) return error(404, 'Game not found');

	if (game.creator !== locals.session.userId) return error(403);

	await db.delete(games).where(eq(games.id, gameId));

	return new Response('', { status: 204 });
};
