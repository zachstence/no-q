import type { PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';

import { db, rolls } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const [roll] = await db.select().from(rolls).where(eq(rolls.id, params.rollId)).limit(1);
	if (!roll) return error(404, 'Roll not found');

	return { roll };
};
