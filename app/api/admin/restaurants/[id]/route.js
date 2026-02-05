import { db } from "@/db";
import { restaurants } from "@/db/schema";
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
