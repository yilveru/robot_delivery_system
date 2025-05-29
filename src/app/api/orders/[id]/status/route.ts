import { db } from "@/db";
import { orders, robots } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


const validTransitions = {
  pending: "assigned",
  assigned: "picked_up",
  picked_up: "delivered",
  delivered: "completed",
};

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {

  const id = Number(params.id);

  const order = await db.query.orders.findFirst({
    where: eq(orders.id, id),
  });

  if (!order) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  const expectedNext = validTransitions[order.status as keyof typeof validTransitions];
  console.log("Expected next status:", expectedNext);

  if (!order.robotId && order.status === "pending") {
    return NextResponse.json(
      { message: "Cannot update status of pending order without robot" },
      { status: 400 }
    );
  }

  const updateData: { status: string; completedAt?: Date } = { status: expectedNext };
  if (expectedNext === "completed") {
    updateData.completedAt = new Date();
  }

  await db.update(orders).set(updateData).where(eq(orders.id, id));

  if (expectedNext === "completed" && order.robotId) {
    await db.update(robots).set({ status: "available" }).where(eq(robots.id, order.robotId));
  }

  return NextResponse.json(
    {
      message: "Order status updated successfully",
      ...updateData
    }
    , { status: 200 }
  );
}
