'use client'

import Link from 'next/link'
import styles from './SellerHomepage.module.css';

export default function SellerHomepage({ user, listings }){

   const { id, name } = user;

   const deleteListing = async (id) => {
      const listing = await fetch('/api/listing/delete', {
        method: 'POST',
        body: id,
      });
  
      if(listing?.ok){
        // ADD SUCCESS MESSAGE
      }else{
        // ADD ERROR MESSAGE
      }
   }

   const confirmClick = (id) => {
      if(confirm(`Are you sure you want to delete product ${id}?`)){
         deleteListing(id)
      }
   }

   return (
      <>
         <div>Hi, {name}</div>
         <div>

            <div className={styles.productList}>
               {listings?.map((item) => {
                  return (
                     <div key={item?.id}>
                        <div><a href={`/seller/${id}/listing/${item?.id}`}>{item?.name}</a></div>
                        <div className={styles.buttons}>
                           <a href={`/seller/${id}/listing/${item?.id}/edit`}>Edit</a>
                           <a href='#' onClick={() => confirmClick(item?.id)}>Delete</a>
                        </div>
                     </div>
                  )
               })}
            </div>

            <Link href={`/seller/${id}/add`}>Add Product</Link>
         </div>
      </>
   )
}