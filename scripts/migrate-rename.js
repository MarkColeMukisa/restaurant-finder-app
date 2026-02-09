import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
    console.log("Starting manual migration...");
    try {
        // Option 1: Rename the column if it exists
        // Check if isFeatured exists first to avoid errors if re-run
        // However, raw SQL in Neon (Postgres) will throw if column doesn't exist.
        // We can inspect 'information_schema' or just try and catch.

        console.log("Attempting to rename 'isFeatured' to 'isPopular'...");
        await sql`ALTER TABLE restaurants RENAME COLUMN "isFeatured" TO "isPopular"`;
        console.log("Success: Renamed 'isFeatured' to 'isPopular'.");
    } catch (e) {
        console.log("Rename failed (maybe column missing or already renamed):", e.message);

        // Option 2: If rename failed, maybe 'isPopular' already exists or 'isFeatured' is gone.
        // We can try to add 'isPopular' if it doesn't exist, just to be safe, 
        // though db:push would have mostly handled 'create' if we didn't abort everything.
        // But the previous abort meant no changes. So 'isFeatured' SHOULD exist.
    }
    console.log("Migration finished.");
}

migrate();
