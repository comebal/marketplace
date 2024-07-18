'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link'
import styles from './SellerHomepage.module.css';

export default function SellerHomepage({ user, listings }){
   const [successDelete, setSuccessDelete] = useState(false);
   const [tempListings, setTempListings] = useState(listings);

   const { id, name } = user;

   const deleteListing = async (id) => {
      const listing = await fetch('/api/listing/delete', {
        method: 'POST',
        body: id,
      });
  
      if(listing?.ok){
         setSuccessDelete(true);
         const filtered = tempListings.filter((listing) => listing?.id !== id);
         setTempListings(filtered);
      }else{
         setSuccessDelete(false);
         alert('Error deleting listing')
      }
   }

   const confirmClick = (id) => {
      if(confirm(`Are you sure you want to delete product?`)){
         deleteListing(id)
      }
   }

   return (
      <>
         <div className={styles.container}>
            <div className={styles.topnav}>
               <div className={styles.name}>Hi, {name}</div>
               <div><a href='/'>Back to homepage</a></div>
            </div>
            <div>
               <div className={styles.productList}>
                  {tempListings?.map((item) => {
                     return (
                        <div key={item?.id}>
                           <div><a className={styles.name} href={`/seller/${id}/listing/${item?.id}`}>{item?.name}</a></div>
                           <div className={styles.buttons}>
                              <a href={`/seller/${id}/listing/${item?.id}/edit`}>Edit</a>
                              <a className={styles.delete} href='#' onClick={() => confirmClick(item?.id)}>Delete</a>
                           </div>
                        </div>
                     )
                  })}
               </div>

               <Link className={styles.addBtn} href={`/seller/${id}/add`}>Add Product</Link>
            </div>
            {successDelete && (
               <div className={styles.success}>Successfully deleted listing</div>
            )}
         </div>
      </>
   )
}