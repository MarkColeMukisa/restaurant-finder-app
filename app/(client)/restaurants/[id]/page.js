import React from "react";
import { RestaurantDetails } from "@/components/site/RestaurantDetails";
import { db } from "@/db";
import { restaurants, reviews, travelerPhotos } from "@/db/schema";
import { eq, ne, desc, sql } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export default async function RestaurantDetailPage({ params }) {
    const { id } = await params;

    // Fetch restaurant, reviews, and related data in parallel
    const [restaurantResult, reviewsResult, relatedResult, photosResult] = await Promise.all([
        db.select().from(restaurants).where(eq(restaurants.id, id)),
        db.select().from(reviews).where(eq(reviews.restaurantId, id)).orderBy(desc(reviews.createdAt)).limit(6),
        db.select().from(restaurants).where(ne(restaurants.id, id)).orderBy(sql`RANDOM()`).limit(4),
        db.select().from(travelerPhotos).where(eq(travelerPhotos.restaurantId, id))
    ]);

    const restaurant = restaurantResult[0] || null;

    if (!restaurant) {
        return (
            <div className="pt-20">
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Restaurant Not Found</h1>
                    <p className="text-foreground/60 max-w-md">
                        The restaurant you are looking for does not exist or has been removed from our curated elite selection.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-20 selection:bg-primary/30 selection:text-primary"> {/* Offset for sticky header */}
            <RestaurantDetails
                restaurant={restaurant}
                initialReviews={reviewsResult}
                initialRelated={relatedResult}
                travelerPhotos={photosResult}
            />
        </div>
    );
}
