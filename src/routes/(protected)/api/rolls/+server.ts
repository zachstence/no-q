import type { RequestHandler } from './$types';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { error } from '@sveltejs/kit';

import { db, rolls } from '$lib/server/db';

const CreateRollSchema = z.object({
	letters: z.string().length(1).array().length(12)
});

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.session) return error(401);

	const body = await request.json();
	const { letters } = CreateRollSchema.parse(body);

	const [existing] = await db.select().from(rolls).where(eq(rolls.letters, letters)).limit(1);

	if (existing) {
		return new Response(JSON.stringify(existing));
	}

	const [roll] = await db
		.insert(rolls)
		.values({
			letters,
			discovered_by: locals.session.userId
		})
		.returning();

	return new Response(JSON.stringify(roll));
};
