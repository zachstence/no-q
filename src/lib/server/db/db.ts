import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = env;

if (!POSTGRES_HOST) throw new Error('Missing required env POSTGRES_HOST');
if (!POSTGRES_PORT) throw new Error('Missing required env POSTGRES_PORT');
if (!POSTGRES_DB) throw new Error('Missing required env POSTGRES_DB');
if (!POSTGRES_USER) throw new Error('Missing required env POSTGRES_USER');
if (!POSTGRES_PASSWORD) throw new Error('Missing required env POSTGRES_PASSWORD');

const client = postgres({
	host: POSTGRES_HOST,
	port: parseInt(POSTGRES_PORT),
	db: POSTGRES_DB,
	user: POSTGRES_USER,
	password: POSTGRES_PASSWORD
});

export const db = drizzle(client, { schema });
