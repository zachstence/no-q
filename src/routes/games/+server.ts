import { db, games, rolls } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';
import { z } from 'zod';
import { error } from '@sveltejs/kit';

const CreateGameSchema = z.object({
	rollId: z.string()
});

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.session) return new Response('', { status: 401 });

	const body = await request.json();
	const { rollId } = CreateGameSchema.parse(body);

	const [roll] = await db.select().from(rolls).where(eq(rolls.id, rollId)).limit(1);
	if (!roll) return error(404, 'Roll not found');

	const [game] = await db
		.insert(games)
		.values({
			creator: locals.session.userId,
			roll: rollId
		})
		.returning();

	return new Response(JSON.stringify(game));
};
