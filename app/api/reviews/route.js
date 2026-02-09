import { db } from "@/db";
import { reviews } from "@/db/schema";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.restaurantId || !body.rating || !body.content) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newReview = {
            id: uuidv4(),
            restaurantId: body.restaurantId,
            userId: body.userId || "guest", // In a real app, get from session
            userName: body.userName || "Guest Diner",
            userImage: body.userImage || null,
            rating: body.rating,
            title: body.title,
            content: body.content,
            createdAt: new Date(),
        };

        await db.insert(reviews).values(newReview);
        return NextResponse.json(newReview);
    } catch (error) {
        console.error("Failed to post review:", error);
        return NextResponse.json({ error: "Failed to post review" }, { status: 500 });
    }
}
