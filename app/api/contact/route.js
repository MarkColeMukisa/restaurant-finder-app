import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            );
        }

        // Insert into database
        await db.insert(inquiries).values({
            id: nanoid(),
            name,
            email,
            subject: subject || "No Subject",
            message,
            status: "unread",
            createdAt: new Date(),
        });

        return NextResponse.json({ success: true, message: "Message sent successfully" });
    } catch (error) {
        console.error("Error submitting contact form:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
