import { db } from "@/db";
import { clients } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function getAll() {

    return await db
        .select()
        .from(clients)
        .orderBy(asc(clients.firstName));
}