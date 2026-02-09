import React from "react";
import { RestaurantsExplorer } from "@/components/site/RestaurantsExplorer";
import { db } from "@/db";
import { restaurants } from "@/db/schema";
import { desc, ilike, or } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export default async function RestaurantsPage({ searchParams }) {
    const { search } = await searchParams;
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

    let allRestaurants = [];
    try {
        allRestaurants = await query.orderBy(desc(restaurants.id)).limit(12);
    } catch (error) {
        console.error("Critical Error in RestaurantsPage:", error);
        // Fallback to empty to prevent crash
        allRestaurants = [];
    }

    return (
        <div className="pt-20 selection:bg-primary/30 selection:text-primary"> {/* Offset for sticky header */}
            <RestaurantsExplorer initialRestaurants={allRestaurants} />
        </div>
    );
}
