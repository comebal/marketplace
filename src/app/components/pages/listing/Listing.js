'use client'

import { useState } from "react";
import ListingItem from "../../shared/ListingItem";
import Image from "next/image";
import styles from './Listing.module.css';
import Link from "next/link";

export default function Listing({ listing }){

   const [isBidLoading, setIsBidLoading] = useState(false);
   const [isBidSuccessful, setIsBidSuccessful] = useState(false);

   const isInt = (value) => {
      return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
   }

   const bidListing = async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target)
      const price = formData.get('price').trim();

      if(!isInt(price) || price === ''){
         alert('Invalid price')
      }else{
         setIsBidLoading(true);

         const bid = await fetch('/api/listing/bid', {
            method: 'POST',
            body: JSON.stringify({ userId: 2, price, listingId: listing?.id }),
         });

         setIsBidLoading(false);
      
         if(bid?.ok){
            setIsBidSuccessful(true);
         }else{
            // ADD ERROR MESSAGE
            alert('Error adding bid. Please try again later.')
         }
      }
   }
   
   return (
      <div className={styles.container}>
         <div className={styles.userOptions}>
            <Link href='/'>Back</Link>
            <div className={styles.userOptionsRight}>
               <Link href='/purchases'>My Purchases</Link>
               <Link href='/'>Switch user</Link>
            </div>
         </div>
         <ListingItem
            listing={listing} 
            isListingDetailPage
         />

         {listing?.status !== 'sold' && (
            <div className={styles.bidsContainer}>
               <form onSubmit={bidListing}>
                  <div className={styles.bidInputs}>
                     <input type='text' name='price' placeholder='Bid Price' />
                     <button type="submit" disabled={isBidLoading}>
                        {isBidLoading && <span><Image src='/assets/loading-spinner.gif' width={12} height={12} /></span>}
                        <span>Bid</span>
                     </button>
                  </div>
               </form>
               {isBidSuccessful && (
                  <div className={styles.bidSuccess}>Your bid has been successfully placed!</div>
               )}
            </div>
         )}
      </div>
   )
}