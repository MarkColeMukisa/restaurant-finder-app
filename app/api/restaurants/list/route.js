import { db } from "@/db";
import { restaurants } from "@/db/schema";
import { desc, ilike, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get("limit") || "12");
        const offset = parseInt(searchParams.get("offset") || "0");
        const search = searchParams.get("search");

        let query = db.select().from(restaurants);

        if (search) {
            const searchLower = `%${search.toLowerCase()}%`;
            query = query.where(
                or(
                    ilike(restaurants.name, searchLower),
                    ilike(restaurants.description, searchLower),
                    ilike(restaurants.address, searchLower),
                    ilike(restaurants.priceRange, searchLower)
                )
            );
        }

        const restaurantsData = await query
            .orderBy(desc(restaurants.id))
            .limit(limit)
            .offset(offset);

        return NextResponse.json(restaurantsData);
    } catch (error) {
        console.error("Failed to fetch restaurants:", error);
        return NextResponse.json({ error: "Failed to fetch restaurants" }, { status: 500 });
    }
}
