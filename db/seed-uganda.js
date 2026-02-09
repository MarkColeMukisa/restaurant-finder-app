
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { restaurants as restaurantsTable, travelerPhotos as travelerPhotosTable } from "./schema.js";
import { v4 as uuidv4 } from "uuid";

config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

// Ugandan Locations with coordinates
const locations = [
    { name: "Kololo, Kampala", lat: 0.3326, lng: 32.5821 },
    { name: "Nakasero, Kampala", lat: 0.3163, lng: 32.5811 },
    { name: "Bugolobi, Kampala", lat: 0.3107, lng: 32.6130 },
    { name: "Muyenga, Kampala", lat: 0.2950, lng: 32.5920 },
    { name: "Ntinda, Kampala", lat: 0.3512, lng: 32.6152 },
    { name: "Kabalagala, Kampala", lat: 0.2921, lng: 32.5888 },
    { name: "Entebbe Road", lat: 0.2800, lng: 32.5500 },
    { name: "Jinja Town", lat: 0.4244, lng: 33.2040 },
    { name: "Fort Portal", lat: 0.6710, lng: 30.2750 },
    { name: "Mbarara", lat: -0.6046, lng: 30.6545 },
    { name: "Gulu", lat: 2.7746, lng: 32.2990 },
    { name: "Acacia Mall, Kampala", lat: 0.3152, lng: 32.5920 },
    { name: "Village Mall, Bugolobi", lat: 0.3100, lng: 32.6100 },
    { name: "Lugogo Bypass", lat: 0.3350, lng: 32.6010 },
    { name: "Bukoto", lat: 0.3450, lng: 32.5950 },
    { name: "Naguru", lat: 0.3380, lng: 32.6050 },
    { name: "Bunga", lat: 0.2850, lng: 32.5950 },
    { name: "Munyonyo", lat: 0.2650, lng: 32.6150 }
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

const amenities = [
    "WiFi", "Outdoor Seating", "Live Music", "Private Dining",
    "Takeaway", "Delivery", "Parking", "Air Conditioning",
    "Wheelchair Accessible", "Bar", "Kids Menu", "Vegan Options"
];

const languages = ["English", "Luganda", "Swahili", "French"];

// Complete Unsplash image URLs (rotating pool)
const restaurantImages = [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1517248135467-4c7ed9d42339?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800"
];

const travelerImagePool = [
    "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1482049016gy-hhbc9e7c6f3f?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1565060169194-19ae73dc6a2e?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1529543544277-750e53a7d087?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=80&w=600"
];

const travelerNames = [
    "Sarah M.", "John K.", "Emily R.", "David L.", "Jessica T.",
    "Michael B.", "Amanda W.", "Chris P.", "Grace N.", "Brian S."
];

const captions = [
    "Amazing food!", "Best dinner ever", "Loved the atmosphere",
    "Will come back!", "Perfect for a date night", "Highly recommend",
    "Delicious!", "Great service too", "A hidden gem"
];

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomSubset(arr, min, max) {
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function generateRestaurant(index) {
    const cuisine = getRandom(cuisines);
    const location = getRandom(locations);
    const name = `${getRandom(prefixes)} ${getRandom(suffixes)}`;

    const priceRange = Math.random() > 0.7 ? "$$$" : Math.random() > 0.4 ? "$$" : "$";
    const rating = parseFloat((3.5 + Math.random() * 1.5).toFixed(1));

    // Get 3-5 images for gallery
    const galleryImages = getRandomSubset(restaurantImages, 3, 5);

    return {
        id: uuidv4(),
        name: `${name} ${index}`,
        description: `Experience authentic ${cuisine} cuisine in the heart of ${location.name}. Perfect for friends and family.`,
        address: location.name,
        latitude: location.lat + (Math.random() - 0.5) * 0.01,
        longitude: location.lng + (Math.random() - 0.5) * 0.01,
        cuisine: [cuisine, ...(Math.random() > 0.6 ? [getRandom(cuisines)] : [])],
        rating: rating,
        reviews: Math.floor(Math.random() * 500),
        priceRange: priceRange,
        distance: `${(Math.random() * 10).toFixed(1)} km`,
        openHours: "10:00 AM - 11:00 PM",
        imageUrl: galleryImages[0], // First image = card image
        images: galleryImages, // All images for gallery
        amenities: getRandomSubset(amenities, 2, 5),
        isVegetarianFriendly: Math.random() > 0.3,
        isTouristFavorite: Math.random() > 0.8,
        languages: getRandomSubset(languages, 1, 3),
        websiteUrl: `https://${name.replace(/\\s+/g, '').toLowerCase()}.ug`,
        menuUrl: `https://${name.replace(/\\s+/g, '').toLowerCase()}.ug/menu`,
        phoneNumber: "+256 700 " + Math.floor(100000 + Math.random() * 900000),
        email: `info@${name.replace(/\\s+/g, '').toLowerCase()}.com`,
        isPopular: rating >= 4.5,
        createdAt: new Date(),
        updatedAt: new Date()
    };
}

function generateTravelerPhotos(restaurantId, count) {
    const photos = [];
    for (let i = 0; i < count; i++) {
        photos.push({
            id: uuidv4(),
            restaurantId: restaurantId,
            imageUrl: getRandom(travelerImagePool),
            caption: getRandom(captions),
            user: getRandom(travelerNames),
            createdAt: new Date()
        });
    }
    return photos;
}

async function seed() {
    console.log("🇺🇬 Generating 100+ Ugandan Restaurants with Gallery + Traveler Photos...");

    const newRestaurants = [];
    const allTravelerPhotos = [];

    for (let i = 0; i < 110; i++) {
        const restaurant = generateRestaurant(i);
        newRestaurants.push(restaurant);

        // Generate 2-5 traveler photos per restaurant
        const travelerPhotos = generateTravelerPhotos(restaurant.id, Math.floor(Math.random() * 4) + 2);
        allTravelerPhotos.push(...travelerPhotos);
    }

    try {
        console.log("🗑️ Deleting all existing traveler photos...");
        await db.delete(travelerPhotosTable);
        console.log("✅ All existing traveler photos deleted.");

        console.log("🗑️ Deleting all existing restaurants...");
        await db.delete(restaurantsTable);
        console.log("✅ All existing restaurants deleted.");

        console.log("📦 Inserting restaurants into database...");
        const chunkSize = 10;
        for (let i = 0; i < newRestaurants.length; i += chunkSize) {
            const chunk = newRestaurants.slice(i, i + chunkSize);
            await db.insert(restaurantsTable).values(chunk);
            console.log(`  ✓ Submitted restaurant chunk ${Math.floor(i / chunkSize) + 1}`);
        }

        console.log("📸 Inserting traveler photos...");
        for (let i = 0; i < allTravelerPhotos.length; i += chunkSize) {
            const chunk = allTravelerPhotos.slice(i, i + chunkSize);
            await db.insert(travelerPhotosTable).values(chunk);
        }
        console.log(`  ✓ Submitted ${allTravelerPhotos.length} traveler photos.`);

        console.log("\\n✅ Successfully seeded 110 Ugandan restaurants with galleries and traveler photos!");
    } catch (e) {
        console.error("❌ Seeding failed:", e);
    }
}

seed();
