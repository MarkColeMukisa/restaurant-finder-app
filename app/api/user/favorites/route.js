
import { db } from "../../../../db";
import { favorites } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

// Force rebuild: Corrected import path for db

export async function GET(req) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userFavorites = await db.select().from(favorites).where(eq(favorites.userId, session.user.id));
        return NextResponse.json(userFavorites);
    } catch (error) {
        console.error("Failed to fetch favorites:", error);
        return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { restaurantId } = await req.json();

        if (!restaurantId) {
            return NextResponse.json({ error: "Restaurant ID required" }, { status: 400 });
        }

        // Check availability
        const existing = await db.select().from(favorites).where(
            and(
                eq(favorites.userId, session.user.id),
                eq(favorites.restaurantId, restaurantId)
            )
        );

        if (existing.length > 0) {
            return NextResponse.json({ message: "Already favorite" });
        }

        await db.insert(favorites).values({
            id: crypto.randomUUID(),
            userId: session.user.id,
            restaurantId: restaurantId
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to add favorite:", error);
        return NextResponse.json({ error: "Failed to add favorite" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { restaurantId } = await req.json();

        if (!restaurantId) {
            return NextResponse.json({ error: "Restaurant ID required" }, { status: 400 });
        }

        await db.delete(favorites).where(
            and(
                eq(favorites.userId, session.user.id),
                eq(favorites.restaurantId, restaurantId)
            )
        );

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Failed to remove favorite:", error);
        return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 });
    }
}
