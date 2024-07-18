'use client'
import { useState } from "react"
import styles from './Listing.module.css';
import { formatter } from '../../../../../lib/utils';

export default function Listing({ listing, slug, bids }){

   const [priceBid, setPriceBid] = useState('');
   const [bidSuccess, setBidSuccess] = useState(false);

   const acceptBid = async () => {

      if(priceBid === ''){
         alert('Select a bid');
      }else{
         const bid = bids.filter((item) => item?.id === priceBid)[0];
         
         const listing = await fetch('/api/listing/acceptBid', {
            method: 'POST',
            body: JSON.stringify({ id: bid?.id, listingId: bid?.listing_id, userId: bid?.user_id }),
         });
      
         if(listing?.ok){
            setBidSuccess(true);
         }else{
            setBidSuccess(false);
            alert('Error bidding.');
         }
      }
   }

   return (
      <div className={styles.container}>
         <div className={styles.links}>
            <a href={`/seller/${slug}`} className={styles.link}>&lt; Go Back</a>
            <a href={`/seller/${slug}/listing/${listing?.id}/edit`}>Edit Product</a>
         </div>
         <div className={styles.content}>
            <table>
               <tbody>
                  <tr>
                     <td>Product Name:</td>
                     <td>{listing?.name}</td>
                  </tr>
                  <tr>
                     <td>Product Description:</td>
                     <td>{listing?.description}</td>
                  </tr>
                  <tr>
                     <td>Product Price:</td>
                     <td>{formatter.format(listing?.price)}</td>
                  </tr>
               </tbody>
            </table>   
         </div>

         {bidSuccess && (
            <div className={styles.successBid}>Your bid has been successful.</div>
         )}

         {!bidSuccess && bids && bids.length > 0 && (
            <div className={styles.bids}>
               <div className={styles.bidLabel}>Active Bids:</div>
               <ul className={styles.bidList}>
                  {bids.map((bid, index) => (
                     <li key={index}><label><input onClick={() => setPriceBid(bid?.id)} name='price' type='radio' /> {formatter.format(bid?.price)}</label></li>
                  ))}
               </ul>
               <button className={styles.acceptBid} onClick={() => acceptBid()}>Accept Bid</button>
            </div>
         )}

         {bids.length === 0 && (
            <div className={styles.noBids}>No Active Bids</div>
         )}
      </div>
   )
}