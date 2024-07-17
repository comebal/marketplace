import { NextResponse } from 'next/server'
import { getIndividuaListing } from '@/app/seller/Seller.model';

export async function POST(req) {
    try {
        const data = await req.json();
        const listing = await getIndividuaListing(data);

        return NextResponse.json({ listing: listing }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.error();
    }
}