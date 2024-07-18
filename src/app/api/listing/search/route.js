import { NextResponse } from 'next/server'
import { findListings } from '@/app/seller/Seller.model';

export async function POST(req) {
    try {
        const data = await req.json();
        const listings = await findListings(data?.search);

        return NextResponse.json({ listings: listings }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.error();
    }
}