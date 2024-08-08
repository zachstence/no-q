import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { z } from 'zod';
import { db, games, solutions } from '$lib/server/db';
import { eq } from 'drizzle-orm';

const IntegerStringSchema = z.coerce.number().int().nonnegative();

const SolveGameSchema = z.record(
	IntegerStringSchema,
	z.record(IntegerStringSchema, z.string().length(1))
);

export const POST: RequestHandler = async ({ locals, params, request }) => {
	if (!locals.session) return error(401);

	const { gameId } = params;

	const [game] = await db.select().from(games).where(eq(games.id, gameId));
	if (!game) return error(404, 'Game not found');

	const body = await request.json();
	const result = SolveGameSchema.safeParse(body);
	if (!result.success) return error(400, { message: 'Invalid request body' });
	const board = result.data;

	// TODO we probably need to shift the board to the top left corner before saving it
	// so that we can compare with other solutions for uniqueness

	const [solution] = await db
		.insert(solutions)
		.values({
			board,
			// TODO check for uniqueness of solution before setting discovered_by
			discovered_by: locals.session.userId
		})
		.returning();

	await db.update(games).set({ solution: solution.id }).where(eq(games.id, gameId));

	return new Response();
};
