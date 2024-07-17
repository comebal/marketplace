'use client'
import { useState } from "react"

export default function Listing({ listing, slug, bids }){

   const [priceBid, setPriceBid] = useState('');

   const acceptBid = async () => {

      const bid = bids.filter((item) => item?.id === priceBid)[0];
      
      const listing = await fetch('/api/listing/acceptBid', {
         method: 'POST',
         body: JSON.stringify({ id: bid?.id, listingId: bid?.listing_id, userId: bid?.user_id }),
       });
   
       if(listing?.ok){
         // ADD SUCCESS MESSAGE
         alert('Success Bid')
       }else{
         // ADD ERROR MESSAGE
       }
   }

   return (
      <div>
         <div>Name: {listing?.name}</div>

         <div>Description: {listing?.description}</div>

         <div>Price: {listing?.price}</div>
         
         <div><a href={`/seller/${slug}/listing/${listing?.id}/edit`}>Edit Product</a></div>

         {bids && bids.length > 0 && (
            <div>
               <div>Bids</div>
               <ul>
                  {bids.map((bid) => (
                     <li><label><input onClick={() => setPriceBid(bid?.id)} name='price' type='radio' /> {bid.price}</label></li>
                  ))}
               </ul>
               <button onClick={() => acceptBid()}>Accept Bid</button>
            </div>
         )}
      </div>
   )
}