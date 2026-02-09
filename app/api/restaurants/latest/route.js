import { db } from "@/db";
import { restaurants } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Fetch the 4 latest restaurants
        const latestRestaurants = await db.select().from(restaurants).orderBy(desc(restaurants.id)).limit(4);
        return NextResponse.json(latestRestaurants);
    } catch (error) {
        console.error("Failed to fetch latest restaurants:", error);
        return NextResponse.json({ error: "Failed to fetch latest restaurants" }, { status: 500 });
    }
}
