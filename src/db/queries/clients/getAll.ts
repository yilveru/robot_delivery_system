import { db } from "@/db";
import { clients } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getAll() {

    return await db
        .select()
        .from(clients)
        .orderBy(desc(clients.firstName));
}