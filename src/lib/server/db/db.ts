import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres({
	host: 'db',
	user: 'postgres',
	password: 'password',
	port: 5432
});

export const db = drizzle(client);
