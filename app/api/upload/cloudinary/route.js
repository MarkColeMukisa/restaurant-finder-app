import { v2 as cloudinary } from 'cloudinary';
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    const session = await auth.api.getSession({
        headers: req.headers
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = cloudinary.utils.api_sign_request(
            {
                timestamp: timestamp,
                upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
            },
            process.env.CLOUDINARY_API_SECRET
        );

        return NextResponse.json({
            signature,
            timestamp,
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
            uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        });
    } catch (error) {
        console.error('Error generating Cloudinary signature:', error);
        return NextResponse.json({ error: 'Failed to generate signature' }, { status: 500 });
    }
}
