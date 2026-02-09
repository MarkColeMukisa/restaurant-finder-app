import { db } from "@/db";
import { restaurants } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const allRestaurants = await db.select().from(restaurants).orderBy(desc(restaurants.id));
        return NextResponse.json(allRestaurants);
    } catch (error) {
        console.error("Failed to fetch restaurants:", error);
        return NextResponse.json({ error: "Failed to fetch restaurants" }, { status: 500 });
    }
}
