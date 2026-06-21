import { Pool } from 'pg';

export const dbPool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function connectDB(): Promise<void> {
  try {
    const client = await dbPool.connect();

    await client.query('SELECT NOW()');

    console.log('Database connected');

    client.release();
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

export async function checkDBHealth(): Promise<boolean> {
  try {
    await dbPool.query('SELECT 1');
    return true;
  } catch {
    return false;
  }
}
