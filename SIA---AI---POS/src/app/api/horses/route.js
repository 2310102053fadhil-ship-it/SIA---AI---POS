import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const horses = await prisma.horse.findMany();
        // Parse the JSON vaccines string back into an array for the frontend
        const formattedHorses = horses.map(horse => ({
            ...horse,
            vaccines: JSON.parse(horse.vaccines),
            details: {
                certId: horse.certId,
                vaccines: JSON.parse(horse.vaccines),
                health: horse.health,
                origin: horse.origin,
                note: horse.note
            }
        }));
        return NextResponse.json(formattedHorses);
    } catch (error) {
        console.error('Error fetching horses:', error);
        return NextResponse.json({ error: 'Failed to fetch horses' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
