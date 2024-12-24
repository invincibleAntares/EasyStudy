import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
const sql = neon('postgresql://neondb_owner:I2HrUxdLw0JX@ep-lively-dawn-a5kz7bm4.us-east-2.aws.neon.tech/neondb?sslmode=require');

export const db = drizzle(sql);