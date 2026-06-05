import fs from 'fs';
import path from 'path';
import { pool } from './pool';

export async function initDb() {
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf-8');

  try {
    await pool.query(schema);
    console.log('✅ DB schema run');
  } catch (err) {
    console.error('❌ DB init failed', err);
    throw err;
  }
}