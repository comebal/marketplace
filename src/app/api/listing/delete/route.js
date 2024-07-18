import { NextResponse } from 'next/server'
import { deleteListings } from '../../../seller/Seller.model';

// To handle a POST request to /api
export async function POST(req) {
   // Do whatever you want
   const data = await req.json();

   const listing = deleteListings(data);

   return NextResponse.json({ message: "Success" }, { status: 200 });
 }