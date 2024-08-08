import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db, games, solutions } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { DenseBoardSchema } from '$lib/Board';

export const POST: RequestHandler = async ({ locals, params, request }) => {
	if (!locals.session) return error(401);

	const { gameId } = params;

	const [game] = await db.select().from(games).where(eq(games.id, gameId));
	if (!game) return error(404, 'Game not found');

	const body = await request.json();
	const parse = DenseBoardSchema.safeParse(body);
	if (!parse.success) {
		console.error('Invalid board', body);
		return error(400, { message: 'Invalid board' });
	}
	const board = parse.data;

	// Get solution if it has already been discovered
	let [solution] = await db.select().from(solutions).where(eq(solutions.board, board));

	// Solution has not been discovered yet, so create it
	if (!solution) {
		[solution] = await db
			.insert(solutions)
			.values({
				board,
				discovered_by: locals.session.userId
			})
			.returning();
	}

	await db.update(games).set({ solution: solution.id }).where(eq(games.id, gameId));

	return new Response();
};
