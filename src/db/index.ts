import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

config({ path: '.env.local' });

const pgsql = neon(process.env.DATABASE_URL!);

const db = drizzle(pgsql, { schema });

export { db };
