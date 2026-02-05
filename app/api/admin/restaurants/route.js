import { db } from "@/db";
import { restaurants } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

// Helper to verify admin status
async function verifyAdmin(req) {
    const session = await auth.api.getSession({
        headers: req.headers
    });

    if (!session || session.user.role !== "admin") {
        return false;
    }
    return true;
}

export async function GET(req) {
    if (!await verifyAdmin(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const allRestaurants = await db.select().from(restaurants);
        return NextResponse.json(allRestaurants);
    } catch (error) {
        console.error("Failed to fetch restaurants:", error);
        return NextResponse.json({ error: "Failed to fetch restaurants" }, { status: 500 });
    }
}

export async function POST(req) {
    if (!await verifyAdmin(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();

        // Destructure and Validate
        const { name, description, cuisine, priceRange, location, imageUrl, isPopular, isTouristFavorite, isVegetarianFriendly, lat, lng, websiteUrl, menuUrl, phone, openingHours, features } = body;

        if (!name || typeof name !== 'string') return NextResponse.json({ error: "Invalid Name" }, { status: 400 });
        if (!location || typeof location !== 'string') return NextResponse.json({ error: "Invalid Location" }, { status: 400 });
        if (!priceRange || typeof priceRange !== 'string') return NextResponse.json({ error: "Invalid Price Range" }, { status: 400 });

        // Cuisine Validation
        if (!cuisine) return NextResponse.json({ error: "Missing Cuisine" }, { status: 400 });

        const id = uuidv4();

        await db.insert(restaurants).values({
            id,
            name,
            description: description || "",
            cuisine: Array.isArray(cuisine) ? cuisine : [cuisine], // Ensure array if schema requires it, or logic handles it
            priceRange,
            address: location,
            imageUrl: imageUrl || "/placeholder.jpg",
            rating: 0, // Default rating
            reviews: 0,
            isPopular: !!isPopular,
            isTouristFavorite: !!isTouristFavorite,
            isVegetarianFriendly: !!isVegetarianFriendly,
            latitude: lat || null,
            longitude: lng || null,
            websiteUrl: websiteUrl || null,
            menuUrl: menuUrl || null,
            phoneNumber: phone || null,
            openHours: openingHours || null,
            amenities: features || [],
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return NextResponse.json({ id, message: "Restaurant created successfully" });
    } catch (error) {
        console.error("Failed to create restaurant:", error);
        return NextResponse.json({ error: "Failed to create restaurant" }, { status: 500 });
    }
}
