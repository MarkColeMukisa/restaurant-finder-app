import { db } from "@/db";
import { restaurants } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { id } = await params;

        const restaurant = await db.select().from(restaurants).where(eq(restaurants.id, id));

        if (!restaurant || restaurant.length === 0) {
            return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
        }

        return NextResponse.json(restaurant[0]);
    } catch (error) {
        console.error("Failed to fetch restaurant:", error);
        return NextResponse.json({ error: "Failed to fetch restaurant" }, { status: 500 });
    }
}
