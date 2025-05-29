import { db } from "@/db";
import { clients } from "@/db/schema";

export async function getAll() {

    return await db
        .select()
        .from(clients);
}