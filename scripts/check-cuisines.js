
import { db } from './db/index.js';
import { restaurants } from './db/schema.js';

async function listCuisines() {
    try {
        const allRestaurants = await db.select().from(restaurants);
        const cuisines = new Set();
        allRestaurants.forEach(r => {
            if (Array.isArray(r.cuisine)) {
                r.cuisine.forEach(c => cuisines.add(c));
            } else if (typeof r.cuisine === 'string') {
                cuisines.add(r.cuisine);
            }
        });
        console.log("Distinct Cuisines:", Array.from(cuisines));
    } catch (error) {
        console.error("Error:", error);
    } finally {
        process.exit(0);
    }
}

listCuisines();
