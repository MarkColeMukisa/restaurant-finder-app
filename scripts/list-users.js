import "dotenv/config";
import { db } from "../db/index.js";
import { user } from "../db/schema.js";

async function listUsers() {
    console.log("Fetching users...");
    try {
        // Select only non-sensitive fields or fields needed for admin summary
        const users = await db.select({
            id: user.id,
            name: user.name,
            role: user.role,
            createdAt: user.createdAt
        }).from(user);

        console.log(`Found ${users.length} users in database.`);

        // Log a summary table, avoiding full record dumps if they contained PII (though we only selected safe fields)
        if (users.length > 0) {
            console.table(users);
        } else {
            console.log("No users found.");
        }

        process.exit(0);
    } catch (error) {
        console.error("Error fetching users.");
        process.exit(1);
    }
}

listUsers();
