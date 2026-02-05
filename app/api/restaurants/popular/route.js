import { db } from "@/db";
import { restaurants } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Fetch only popular restaurants (isPopular = true)
        const popularRestaurants = await db.select().from(restaurants).where(eq(restaurants.isPopular, true));

        // If we want to return results, we should return them. 
        // If no popular restaurants exist, this returns an empty array, which is correct.
        // We do NOT want to fallback to high-rated restaurants here to prevent confusion.

        return NextResponse.json(popularRestaurants);
    } catch (error) {
        console.error("Failed to fetch popular restaurants:", error);
        return NextResponse.json({ error: "Failed to fetch popular restaurants" }, { status: 500 });
    }
}
