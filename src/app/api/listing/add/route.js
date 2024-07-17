import { NextResponse } from 'next/server'
import { createListings } from '../../../seller/Seller.model';

// To handle a POST request to /api
export async function POST(req) {

    try {
        const data = await req.json();
        createListings(data)
        return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.error();
    }
}