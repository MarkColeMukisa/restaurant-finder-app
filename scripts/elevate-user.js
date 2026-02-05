import "dotenv/config";
import { db } from "../db/index.js";
import { user } from "../db/schema.js";
import { eq } from "drizzle-orm";

async function elevate(email) {
    if (!email) {
        console.error("Please provide an email address.");
        process.exit(1);
    }

    console.log(`Elevating user: ${email}...`);

    try {
        const result = await db.update(user)
            .set({ role: "admin" })
            .where(eq(user.email, email))
            .returning();

        if (result.length === 0) {
            console.error("User not found.");
        } else {
            console.log("Success! User elevated to admin:", result[0]);
        }
    } catch (error) {
        console.error("Error elevating user:", error);
    } finally {
        process.exit(0);
    }
}

// Get email from command line argument
const emailArg = process.argv[2];
elevate(emailArg);
