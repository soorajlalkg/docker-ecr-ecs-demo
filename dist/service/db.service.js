"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbPool = void 0;
exports.connectDB = connectDB;
exports.checkDBHealth = checkDBHealth;
const pg_1 = require("pg");
exports.dbPool = new pg_1.Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    },
});
async function connectDB() {
    try {
        const client = await exports.dbPool.connect();
        await client.query('SELECT NOW()');
        console.log('Database connected');
        client.release();
    }
    catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
}
async function checkDBHealth() {
    try {
        await exports.dbPool.query('SELECT 1');
        return true;
    }
    catch {
        return false;
    }
}
