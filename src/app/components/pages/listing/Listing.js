'use client'

import { useState } from "react";

export default function Listing({ listing }){
   const [sold, setSold] = useState(false);
   
   const buyListing = async (id) => {
      const listing = await fetch('/api/listing/enquire', {
         method: 'POST',
         body: JSON.stringify({ id, userId: 2 }),
       });
   
       if(listing?.ok){
         setSold(true);
       }else{
         // ADD ERROR MESSAGE
       }
   }

   const bidListing = async (e) => {
      e.preventDefault();
      
      const formData = new FormData(e.target)
      const price = formData.get('price');

      const bid = await fetch('/api/listing/bid', {
         method: 'POST',
         body: JSON.stringify({ userId: 2, price, listingId: listing?.id }),
       });
   
       if(bid?.ok){
         alert('Bid success')
       }else{
         // ADD ERROR MESSAGE
       }
   }
   
   return (
      <div>
         <div>
            <div>Listing</div>
            <div>Name: {listing?.name}</div>
            <div>Description: {listing?.description}</div>
            <div>Price: {listing?.price}</div>
            <button disabled={listing?.status === 'sold' || sold} onClick={() => buyListing(listing?.id)}>Buy</button>
         </div>
         {listing?.status !== 'sold' && (
            <div>
               <form onSubmit={bidListing}>
                  <input type='text' name='price' placeholder='Bid Price' />
                  <button type="submit">Bid</button>
               </form>
            </div>
         )}
      </div>
   )
}