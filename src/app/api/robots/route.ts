import { NextResponse } from 'next/server';
import { db } from '@/db';
import { robots } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getAll } from "@/db/queries/robots";

export async function POST(req: Request) {
    const { id, robotId, status } = await req.json();

    if (!robotId || !status) {
        return NextResponse.json({ error: 'Need robot and status' }, { status: 400 });
    }

    try {
        const existingRobot = await db.query.robots.findFirst({
            where: eq(robots.robotId, robotId),
        });

        if (existingRobot && existingRobot.id !== id) {
            return NextResponse.json({ error: 'Robot ID already exists' }, { status: 400 });
        }

        if (id) {
            await db.update(robots).set({ robotId, status }).where(eq(robots.id, id));
        } else {
            await db.insert(robots).values({ robotId, status });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error saving robot' }, { status: 500 });
    }
}

export async function GET() {

    try {
        const robotsList = await getAll();
        return NextResponse.json(robotsList);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error getting robots' }, { status: 500 });

    }
}
