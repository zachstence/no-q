import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { verify } from '@node-rs/argon2';

import { lucia } from '$lib/server/auth';
import { db, users } from '$lib/server/db';

// TODO rate-limiting to prevent abuse of login / brute forcing passwords

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		if (typeof username !== 'string') {
			return fail(400, {
				message: 'Invalid username'
			});
		}

		const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
		if (!user) {
			return fail(400, {
				message: 'Incorrect username or password'
			});
		}

		const isPasswordCorrect = await verify(user.password_hash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!isPasswordCorrect) {
			return fail(400, {
				message: 'Incorrect username or password'
			});
		}

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
