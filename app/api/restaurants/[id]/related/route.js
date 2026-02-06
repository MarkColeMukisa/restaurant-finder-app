import { db } from "@/db";
import { restaurants } from "@/db/schema";
import { ne, desc, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { id } = await params; // It's text

        // Fetch 4 random restaurants excluding the current one
        // Note: ORDER BY RANDOM() is specific to Postgres
        const related = await db.select()
            .from(restaurants)
            .where(ne(restaurants.id, id))
            .orderBy(sql`RANDOM()`)
            .limit(4);

        return NextResponse.json(related);
    } catch (error) {
        console.error("Failed to fetch related restaurants:", error);
        return NextResponse.json({ error: "Failed to fetch related restaurants" }, { status: 500 });
    }
}
