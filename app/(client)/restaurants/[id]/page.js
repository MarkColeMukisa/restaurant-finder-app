"use client";

import React from "react";
import { useParams } from "next/navigation";
import { RestaurantDetails } from "@/components/site/RestaurantDetails";
import { restaurants } from "@/lib/dummy-data";

export default function RestaurantDetailPage() {
    const params = useParams();
    const id = parseInt(params.id);
    const restaurant = restaurants.find(r => r.id === id);

    return (
        <div className="pt-20 selection:bg-primary/30 selection:text-primary"> {/* Offset for sticky header */}
            {restaurant ? (
                <RestaurantDetails restaurant={restaurant} />
            ) : (
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Restaurant Not Found</h1>
                    <p className="text-foreground/60 max-w-md">
                        The restaurant you are looking for does not exist or has been removed from our curated elite selection.
                    </p>
                </div>
            )}
        </div>
    );
}
