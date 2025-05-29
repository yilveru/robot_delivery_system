import { NextResponse } from 'next/server';
import { getAll } from "@/db/queries/restaurants";

export async function GET() {

    try {
        const robotsList = await getAll();
        return NextResponse.json(robotsList);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error getting robots' }, { status: 500 });

    }
}
