import { fail, redirect } from '@sveltejs/kit';

import { lucia } from '$lib/server/auth';
import type { Actions } from './$types';
import { rollLetters } from '$lib/rollLetters';
import type { Game, Roll } from '$lib/server/db';

export const actions: Actions = {
	play: async ({ locals, fetch }) => {
		if (!locals.session) return fail(401);

		const letters = rollLetters();

		const r1 = await fetch('/rolls', { method: 'POST', body: JSON.stringify({ letters }) });
		const roll = (await r1.json()) as Roll;

		const r2 = await fetch('/games', { method: 'POST', body: JSON.stringify({ rollId: roll.id }) });
		const game = (await r2.json()) as Game;

		return redirect(303, `/games/${game.id}`);
	},

	logout: async (event) => {
		if (!event.locals.session) return fail(401);

		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		redirect(302, '/sign-in');
	}
};
