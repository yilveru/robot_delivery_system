import { db } from "@/db";
import { robots } from "@/db/schema";

export async function getAll() {

    return await db
        .select()
        .from(robots);
}