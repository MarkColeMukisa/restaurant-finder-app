import "dotenv/config";
import { db } from "../db/index.js";
import { user } from "../db/schema.js";

async function listUsers() {
    console.log("Fetching users...");
    try {
        const users = await db.select().from(user);
        console.log("Users in database:");
        console.table(users);
    } catch (error) {
        console.error("Error fetching users:", error);
    } finally {
        process.exit(0);
    }
}

listUsers();
