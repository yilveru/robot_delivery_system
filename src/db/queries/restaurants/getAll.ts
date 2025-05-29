import { db } from "@/db";
import { restaurants } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function getAll() {

    return await db
        .select()
        .from(restaurants)
        .orderBy(asc(restaurants.name));
}