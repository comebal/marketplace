import { NextResponse } from 'next/server'
import { editListing } from '../../../seller/Seller.model';

export async function POST(req) {
    try {
        const data = await req.json();
        editListing(data)
        return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.error();
    }
}