import 'dotenv/config';
import { db } from '../db/index.js';
import { restaurants } from '../db/schema.js';
import { desc, ilike, or } from 'drizzle-orm';

async function main() {
    try {
        console.log('Running RestaurantsPage query reproduction...');

        // Scenario 1: No search (Default load)
        console.log('--- Scenario 1: No Search ---');
        let query1 = db.select().from(restaurants);
        const result1 = await query1.orderBy(desc(restaurants.id)).limit(12);
        console.log('Scenario 1 Success! Rows fetched:', result1.length);

        // Scenario 2: With Search (Simulate "Kampala")
        console.log('--- Scenario 2: With Search "Kampala" ---');
        const search = "Kampala";
        let query2 = db.select().from(restaurants);
        const searchLower = `%${search.toLowerCase()}%`;
        query2 = query2.where(
            or(
                ilike(restaurants.name, searchLower),
                ilike(restaurants.description, searchLower),
                ilike(restaurants.address, searchLower),
                ilike(restaurants.priceRange, searchLower)
            )
        );
        const result2 = await query2.orderBy(desc(restaurants.id)).limit(12);
        console.log('Scenario 2 Success! Rows fetched:', result2.length);

    } catch (error) {
        console.error('Reproduction Failed:', error);
        if (error.cause) console.error('Caused by:', error.cause);
    }
}

main();
