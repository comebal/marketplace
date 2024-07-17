import { NextResponse } from 'next/server'
import { enquireListing } from '@/app/seller/Seller.model';

export async function POST(req) {
    try {
        const data = await req.json();

        await enquireListing(data);

        return NextResponse.json({ message: 'success' }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.error();
    }
}