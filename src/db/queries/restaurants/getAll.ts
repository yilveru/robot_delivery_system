import { db } from "@/db";
import { restaurants } from "@/db/schema";

export async function getAll() {

    return await db
        .select()
        .from(restaurants);
}