import { db } from "@/db";
import { restaurants, travelerPhotos } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
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

export async function GET(req, { params }) {
    if (!await verifyAdmin(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        const restaurantResult = await db.select().from(restaurants).where(eq(restaurants.id, id));
        const restaurant = restaurantResult[0];

        if (!restaurant) {
            return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
        }

        const photos = await db.select().from(travelerPhotos).where(eq(travelerPhotos.restaurantId, id));

        return NextResponse.json({
            ...restaurant,
            travelerPhotos: photos
        });
    } catch (error) {
        console.error(`Failed to fetch restaurant ${id}:`, error);
        return NextResponse.json({ error: "Failed to fetch restaurant" }, { status: 500 });
    }
}

export async function PATCH(req, { params }) {
    if (!await verifyAdmin(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        const body = await req.json();
        const { id: _, createdAt: __, ...updateData } = body; // Prevent overwriting ID and createdAt

        await db.update(restaurants)
            .set({
                ...updateData,
                updatedAt: new Date(),
            })
            .where(eq(restaurants.id, id));

        // travelerPhotos Syncing
        if (body.travelerPhotos) {
            // Remove existing photos
            await db.delete(travelerPhotos).where(eq(travelerPhotos.restaurantId, id));

            // Insert new ones if any
            if (Array.isArray(body.travelerPhotos) && body.travelerPhotos.length > 0) {
                const { v4: uuidv4 } = require("uuid");
                const photosToInsert = body.travelerPhotos.map(photo => ({
                    id: uuidv4(),
                    restaurantId: id,
                    imageUrl: photo.imageUrl,
                    caption: photo.caption || null,
                    user: photo.user || null,
                }));
                await db.insert(travelerPhotos).values(photosToInsert);
            }
        }

        return NextResponse.json({ message: "Restaurant updated successfully" });
    } catch (error) {
        console.error(`Failed to update restaurant ${id}:`, error);
        return NextResponse.json({ error: "Failed to update restaurant" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    if (!await verifyAdmin(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        await db.delete(restaurants).where(eq(restaurants.id, id));
        return NextResponse.json({ message: "Restaurant deleted successfully" });
    } catch (error) {
        console.error(`Failed to delete restaurant ${id}:`, error);
        return NextResponse.json({ error: "Failed to delete restaurant" }, { status: 500 });
    }
}
