import { db } from "@/db";
import { restaurants } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getAll() {

    return await db
        .select()
        .from(restaurants)
        .orderBy(desc(restaurants.name));
}