'use client'

import { useState } from 'react';
import styles from './ListingItem.module.css';
import Link from 'next/link';
import Image from 'next/image';
import cx from 'classnames';

const formatter = new Intl.NumberFormat('en-US', {
   style: 'currency',
   currency: 'USD',
});

export default function ListingItem(props){
   const { listing, isListingDetailPage } = props;

   const listingStatusSold = listing?.status === 'sold';

   const [isSold, setIsSold] = useState(false);
   const [isBuying, setIsBuying] = useState(false);

   const buyListing = async (id) => {
      setIsBuying(true);
      
      const listing = await fetch('/api/listing/enquire', {
         method: 'POST',
         body: JSON.stringify({ id, userId: 2 }),
       });

       setIsBuying(false);
   
       if(listing?.ok){
         setIsSold(true);
       }else{
         alert('Error purchasing listing');
         setIsSold(false);
       }
   }

   return (
      <div className={cx(styles.listing, { [styles.listingWidth]: isListingDetailPage})}>
         <div className={cx(styles.listingPhoto, { [styles.listingDetailPhoto]: isListingDetailPage})}>
            <Link href={`/listing/${listing?.id}`}>
               <Image src='/assets/no-photo.png' width={0} height={0} sizes="100vw" style={{ width: '99%', height: 'auto' }} />
            </Link>
         </div>
         <div className={styles.attributes}>
            <div className={styles.name}>
               <Link href={`/listing/${listing?.id}`}>{listing?.name}</Link>
            </div>
            <div className={styles.desc}>{listing?.description}</div>
            <div className={styles.priceContainer}>
               <div className={styles.price}>{formatter.format(listing?.price)}</div>
               <button disabled={isSold || isBuying || listingStatusSold} className={cx({ [styles.sold]: isSold || listingStatusSold })} onClick={() => buyListing(listing?.id)}>
                  {isBuying && <Image src='/assets/loading-spinner.gif' width={12} height={12} />}
                  {!isBuying && (
                     isSold || listingStatusSold ? 'Sold' : 'Buy'
                  )}
               </button>
            </div>   
         </div>
      </div>
   )
}