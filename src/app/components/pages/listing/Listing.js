'use client'

import { useState, useEffect } from "react";
import ListingItem from "../../shared/ListingItem";
import Image from "next/image";
import styles from './Listing.module.css';
import Link from "next/link";
import { getCookie, isInt, formatter } from "../../../../../lib/utils";

export default function Listing({ listing }){

   const [isBidLoading, setIsBidLoading] = useState(false);
   const [isBidSuccessful, setIsBidSuccessful] = useState(false);
   const [bids, setBids] = useState([]);

   useEffect(() => {
      const user = JSON.parse(getCookie('user'));

      const findBids = async () => {
         const response = await fetch('/api/listing/viewBids', {
            method: 'POST',
            body: JSON.stringify({ id: listing?.id, userId: user?.userId }),
         });
         if(response?.ok){
           const data = await response.json();
           setBids(data?.bids);
         }else{
            setBids([]);
         }
       }

      findBids();
   }, []);

   const bidListing = async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target)
      const price = formData.get('price').trim();

      const user = JSON.parse(getCookie('user'));

      if(!isInt(price) || price === ''){
         alert('Invalid price')
      }else{
         setIsBidLoading(true);

         const bid = await fetch('/api/listing/bid', {
            method: 'POST',
            body: JSON.stringify({ userId: user?.userId, price, listingId: listing?.id }),
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
               <Link href='/switch'>Switch user</Link>
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
               {bids && bids.length > 0 && (
                  <div className={styles.previousBids}>
                     <div className={styles.title}>Your previous Bids:</div>
                     {bids.map((bid) => (
                        <div>Price: {formatter.format(bid?.price)}</div>
                     ))}
                  </div>
               )}
               {isBidSuccessful && (
                  <div className={styles.bidSuccess}>Your bid has been successfully placed!</div>
               )}
            </div>
         )}
      </div>
   )
}