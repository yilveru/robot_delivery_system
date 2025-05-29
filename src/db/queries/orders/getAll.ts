import { db } from "@/db";
import { orders, clients, restaurants, robots } from "@/db/schema"; // tu tabla
import { eq, sql, desc } from "drizzle-orm";

export async function getAll() {
    return await db
        .select({
            id: orders.id,
            status: orders.status,
            completedAt: orders.completedAt,
            clientId: orders.clientId,
            clientName: sql<string>`${clients.firstName} || ' ' || ${clients.lastName}`,
            restaurantId: orders.restaurantId,
            restaurantName: restaurants.name,
            robotId: orders.robotId,
            robotInternalId: robots.robotId,
            items: orders.items,
        })
        .from(orders)
        .innerJoin(clients, eq(orders.clientId, clients.id))
        .innerJoin(restaurants, eq(orders.restaurantId, restaurants.id))
        .leftJoin(robots, eq(orders.robotId, robots.id))
        .orderBy(desc(orders.createdAt));
}