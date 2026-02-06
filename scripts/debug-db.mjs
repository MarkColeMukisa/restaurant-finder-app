import 'dotenv/config';
import { db } from '../db/index.js';
import { sql } from 'drizzle-orm';

async function main() {
    try {
        console.log('Checking specific columns...');
        const result = await db.execute(sql`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'restaurants' 
            AND column_name IN ('reviews', 'createdAt', 'updatedAt', 'priceRange');
        `);
        console.log('Found columns:', result.rows.map(r => r.column_name));

        console.log('Attempting SELECT query...');
        await db.execute(sql`SELECT "reviews", "createdAt" FROM "restaurants" LIMIT 1`);
        console.log('SELECT query successful!');
    } catch (error) {
        console.error('Debug Check Failed:', error.message);
    }
}

main();
