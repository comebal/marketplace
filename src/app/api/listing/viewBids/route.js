import { NextResponse } from 'next/server'
import { findListingUserBids } from '@/app/seller/Seller.model';

export async function POST(req) {
    try {
        const data = await req.json();
        const bids = await findListingUserBids(data?.id, data?.userId);

        return NextResponse.json({ bids: bids?.bids }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.error();
    }
}