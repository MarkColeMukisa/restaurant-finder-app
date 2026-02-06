
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { restaurants as restaurantsTable, reviews as reviewsTable } from "./schema";
import { v4 as uuidv4 } from "uuid";

config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

// Ugandan Locations
const locations = [
    "Kololo, Kampala", "Nakasero, Kampala", "Bugolobi, Kampala", "Muyenga, Kampala",
    "Ntinda, Kampala", "Kabalagala, Kampala", "Entebbe Road", "JinJA Town",
    "Fort Portal", "Mbarara", "Gulu", "Acacia Mall, Kampala", "Village Mall, Bugolobi",
    "Lugogo Bypass", "Bukoto", "Naguru", "Bunga", "Munyonyo"
];

const cuisines = [
    "Ugandan", "Indian", "Chinese", "Italian", "Mexican", "Thai",
    "Fast Food", "BBQ", "Cafe", "Fusion", "Seafood", "Mediterranean"
];

const prefixes = [
    "The Royal", "Golden", "Mama's", "Cafe", "Bistro", "Hotel",
    "Urban", "Village", "Spice", "Taste of", "Pearl of", "Kampala",
    "Nile", "Savannah", "Tropical", "Elite", "Grand", "Little"
];

const suffixes = [
    "Gardens", "Grill", "Kitchen", "Pot", "Bites", "Lounge",
    "Restobar", "Diner", "Eatery", "Haven", "Spot", "Corner",
    "View", "Terrace", "Courtyard", "Palace"
];

// Placeholder images (rotating to avoid 404s)
const images = [
    "https://images.unsplash.com/photo-1517248135467-4c7ed9d42339?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&q=80&w=800"
];

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateRestaurant(index) {
    const cuisine = getRandom(cuisines);
    const location = getRandom(locations);
    const name = `${getRandom(prefixes)} ${getRandom(suffixes)}`;

    // Generate realistic price based on location/name vibe
    const priceRange = Math.random() > 0.7 ? "$$$" : Math.random() > 0.4 ? "$$" : "$";

    // High rating bias for "Elite" feel
    const rating = parseFloat((3.5 + Math.random() * 1.5).toFixed(1));

    return {
        id: uuidv4(),
        name: `${name} ${index}`, // Append index to ensure uniqueness if random fails
        description: `Experience authentic ${cuisine} cuisine in the heart of ${location}. Perfect for friends and family.`,
        address: location,
        cuisine: [cuisine], // Schema expects array
        rating: rating,
        reviews: Math.floor(Math.random() * 500),
        priceRange: priceRange,
        distance: `${(Math.random() * 10).toFixed(1)} km`,
        openHours: "10:00 AM - 11:00 PM",
        imageUrl: getRandom(images),
        isVegetarianFriendly: Math.random() > 0.3,
        isTouristFavorite: Math.random() > 0.8,
        isPopular: rating >= 4.5,
        phoneNumber: "+256 700 " + Math.floor(100000 + Math.random() * 900000),
        email: `info@${name.replace(/\s+/g, '').toLowerCase()}.com`,
        createdAt: new Date(),
        updatedAt: new Date()
    };
}

async function seed() {
    console.log("🇺🇬 Generating 100+ Ugandan Restaurants...");

    const newRestaurants = [];
    for (let i = 0; i < 110; i++) {
        newRestaurants.push(generateRestaurant(i));
    }

    try {
        console.log("Inserting into database...");
        // Batch insert in chunks of 10 to avoid payload limits
        const chunkSize = 10;
        for (let i = 0; i < newRestaurants.length; i += chunkSize) {
            const chunk = newRestaurants.slice(i, i + chunkSize);
            await db.insert(restaurantsTable).values(chunk);
            console.log(`Submitted chunk ${i / chunkSize + 1}`);
        }

        console.log("✅ Successfully seeded 110 Ugandan restaurants!");
    } catch (e) {
        console.error("❌ Seeding failed:", e);
    }
}

seed();
