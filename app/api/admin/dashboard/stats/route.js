import { db } from "@/db";
import { restaurants, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { count } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
    const session = await auth.api.getSession({
        headers: req.headers
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const [userCount] = await db.select({ value: count() }).from(user);
        const [restaurantCount] = await db.select({ value: count() }).from(restaurants);

        return NextResponse.json({
            totalUsers: userCount.value,
            totalRestaurants: restaurantCount.value,
            pendingReviews: 0, // Placeholder for future feature
            systemStatus: "Operational"
        });
    } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
