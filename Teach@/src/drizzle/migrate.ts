import "dotenv/config";
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import {db, client } from './db';

async function migration() {
  try {
    await migrate(db, { migrationsFolder: __dirname + '/migrations' });
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
    process.exit(0);
  }
}

migration().catch((err) => {
  console.error(err);
  process.exit(1);
});
