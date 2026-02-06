import { db } from "@/db";
import { reviews, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const restaurantId = searchParams.get("restaurantId");
        const limit = parseInt(searchParams.get("limit") || "6");
        const offset = parseInt(searchParams.get("offset") || "0");

        if (!restaurantId) {
            return NextResponse.json({ error: "Restaurant ID is required" }, { status: 400 });
        }

        const reviewsData = await db.select()
            .from(reviews)
            .where(eq(reviews.restaurantId, restaurantId))
            .orderBy(desc(reviews.createdAt))
            .limit(limit)
            .offset(offset);

        return NextResponse.json(reviewsData);
    } catch (error) {
        console.error("Failed to fetch reviews:", error);
        return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
}
