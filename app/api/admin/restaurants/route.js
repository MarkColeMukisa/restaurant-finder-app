import { db } from "@/db";
import { restaurants } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

// Helper to verify admin status
async function verifyAdmin(req) {
    const session = await auth.api.getSession({
        headers: req.headers
    });

    if (!session || session.user.role !== "admin") {
        return false;
    }
    return true;
}

export async function GET(req) {
    if (!await verifyAdmin(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const allRestaurants = await db.select().from(restaurants);
        return NextResponse.json(allRestaurants);
    } catch (error) {
        console.error("Failed to fetch restaurants:", error);
        return NextResponse.json({ error: "Failed to fetch restaurants" }, { status: 500 });
    }
}

export async function POST(req) {
    if (!await verifyAdmin(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const id = uuidv4();

        await db.insert(restaurants).values({
            ...body,
            id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return NextResponse.json({ id, message: "Restaurant created successfully" });
    } catch (error) {
        console.error("Failed to create restaurant:", error);
        return NextResponse.json({ error: "Failed to create restaurant" }, { status: 500 });
    }
}
