import "dotenv/config";
import { db } from "../db/index.js";
import { user } from "../db/schema.js";
import { eq } from "drizzle-orm";

async function elevate(email) {
    if (!email) {
        console.error("Please provide an email address.");
        process.exit(1);
    }

    const normalizedEmail = email.trim().toLowerCase();
    console.log(`Elevating user: ${normalizedEmail}...`);

    try {
        const result = await db.update(user)
            .set({ role: "admin" })
            .where(eq(user.email, normalizedEmail))
            .returning();

        if (result.length === 0) {
            console.error(`User not found: ${normalizedEmail}`);
            process.exit(1);
        } else {
            const { id, email: userEmail, role } = result[0];
            console.log("Success! User elevated:", { id, email: userEmail, role });
            process.exit(0);
        }
    } catch (error) {
        console.error("An error occurred while elevating user.");
        process.exit(1);
    }
}

// Get email from command line argument
const emailArg = process.argv[2];
elevate(emailArg);
