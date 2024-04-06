import { Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';

import type { DB } from './types.ts';

const connectionString = process.env.DATABASE_URL;

const dialect = new PostgresDialect({
  pool: new pg.Pool({
    connectionString,
  }),
});

declare global {
  // eslint-disable-next-line no-var
  var kysely: Kysely<DB>;
}

if (!global.kysely) {
  global.kysely = new Kysely<DB>({
    dialect,
  });
}

export const db = global.kysely;
