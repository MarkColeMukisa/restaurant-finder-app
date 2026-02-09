
import { db as originalDb } from "@/db";

// Re-export db for backward compatibility/import fixes
export const db = originalDb;
