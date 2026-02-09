import 'dotenv/config';
import { db } from '../db/index.js';
import { restaurants } from '../db/schema.js';
import { desc } from 'drizzle-orm';

async function main() {
    try {
        console.log('Running Drizzle query...');
        const result = await db.select().from(restaurants).orderBy(desc(restaurants.createdAt)).limit(8);
        console.log('Query successful!');
        console.log('Fetched rows:', result.length);
        if (result.length > 0) {
            console.log('Sample row:', result[0]);
        }
    } catch (error) {
        console.error('Drizzle Query Failed:', error);
    }
}

main();
