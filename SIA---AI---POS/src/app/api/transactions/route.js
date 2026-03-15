import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();
        const { buyer, items, total, zakat, grandTotal } = body;

        // Create the transaction
        const transaction = await prisma.transaction.create({
            data: {
                buyerName: buyer.name,
                buyerAddress: buyer.address,
                method: buyer.method,
                total: total,
                zakat: zakat,
                grandTotal: grandTotal,
                items: {
                    create: items.map(item => ({
                        horseId: item.id,
                        priceAtSale: item.price
                    }))
                }
            },
            include: {
                items: true,
            }
        });

        return NextResponse.json({ success: true, transaction });
    } catch (error) {
        console.error('Error saving transaction:', error);
        return NextResponse.json({ error: 'Failed to save transaction' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
