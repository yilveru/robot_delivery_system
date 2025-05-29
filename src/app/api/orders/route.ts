import { NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { getAll } from "@/db/queries/orders";

export async function POST(req: Request) {
    const { clientId, restaurantId, items } = await req.json();

    if (!clientId || !restaurantId) {
        return NextResponse.json({ error: 'Need client and restaurant' }, { status: 400 });
    }

    try {
        await db.insert(orders).values({
            status: 'pending', clientId, restaurantId, items: JSON.stringify(items), createdAt: new Date()
        });
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Error saving the order' }, { status: 500 });
    }
}

export async function GET() {

    try {
        const ordersList = await getAll();
        return NextResponse.json(ordersList);
    } catch {
        return NextResponse.json({ error: 'Error getting orders' }, { status: 500 });
    }
}
