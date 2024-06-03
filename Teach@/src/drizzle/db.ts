import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { Client } from 'pg';

// Initialize the PostgreSQL client
export const client = new Client({
  connectionString: process.env.DATABASE_URL as string,
});

// Connect the client
client.connect();

// Export the drizzle instance
export const db = drizzle(client, { schema, logger: true });
