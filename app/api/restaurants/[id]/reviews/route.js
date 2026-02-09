import { db } from "@/db";
import { reviews } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const restaurantReviews = await db.select().from(reviews).where(eq(reviews.restaurantId, id)).orderBy(desc(reviews.createdAt));
        return NextResponse.json(restaurantReviews);
    } catch (error) {
        console.error("Failed to fetch reviews:", error);
        return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
}
