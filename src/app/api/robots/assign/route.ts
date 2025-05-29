import { NextResponse } from 'next/server';
import { db } from '@/db';
import { robots, orders } from '@/db/schema';
import { eq, or, isNull } from 'drizzle-orm';

export async function POST(req: Request) {
    const { orderId } = await req.json();

    const availableRobots = await db
        .select()
        .from(robots)
        .where(
            or(
                isNull(robots.status),
                eq(robots.status, 'available')
            )
        )
        .limit(1);

    if (availableRobots.length === 0) {
        return NextResponse.json({ error: 'No robots available' }, { status: 400 });
    }

    const robot = availableRobots[0];

    await db.transaction(async (tx) => {
        // Assign the robot to the order
        await tx
            .update(orders)
            .set({ robotId: robot.id, status: 'assigned' })
            .where(eq(orders.id, orderId));

        // Update robot status to 'busy'
        await tx.update(robots).set({ status: 'busy' }).where(eq(robots.id, robot.id));

    });


    return NextResponse.json({ success: true, robotId: robot.id });
}
