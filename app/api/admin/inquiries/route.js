import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";

// GET: Fetch all inquiries
export async function GET(req) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
        const data = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
    }
}

// PATCH: Update status (Read/Unread)
export async function PATCH(req) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
        const body = await req.json();
        const { id, status } = body;

        // Validation
        if (!id || typeof id !== 'string') {
            return NextResponse.json({ error: "Invalid input: ID is required" }, { status: 400 });
        }

        const allowedStatuses = ["read", "unread"];
        if (!status || !allowedStatuses.includes(status)) {
            return NextResponse.json({ error: "Invalid input: Status must be 'read' or 'unread'" }, { status: 400 });
        }

        await db.update(inquiries)
            .set({ status })
            .where(eq(inquiries.id, id));

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
    }
}

// DELETE: Delete an inquiry
export async function DELETE(req) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Missing ID" }, { status: 400 });
        }

        await db.delete(inquiries).where(eq(inquiries.id, id));

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
    }
}
