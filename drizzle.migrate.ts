import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

export const client = postgres({
	host: 'localhost',
	user: 'postgres',
	password: 'password',
	port: 5432
});

export const db = drizzle(client);

await migrate(db, { migrationsFolder: './drizzle' });

await client.end();
