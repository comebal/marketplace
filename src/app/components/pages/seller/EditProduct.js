'use client'

import { useState } from 'react';
import styles from './AddProduct.module.css';
import AddEditListing from '../../shared/AddEditListing';
import { isInt } from '../../../../../lib/utils';

export default function EditProduct({ listing, userId }){
   const [successEdit, setSuccessEdit] = useState(false);

   const onSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData(e.target)
      const name = formData.get('name');
      const description = formData.get('description');
      const price = formData.get('price');
      const id = listing?.id;

      if(name === ''){
         alert('Enter product name');
      }else if(description === ''){
         alert('Enter product description');
      }else if(price === ''){
         alert('Enter product price');
      }else if(!isInt(price)){
         alert('Invalid product price');
      }else{
         editListing({ id, name, description, price });
      }
   }

   const editListing = async (data) => {
      const listing = await fetch('/api/listing/edit', {
        method: 'POST',
        body: JSON.stringify(data),
      });
  
      if(listing?.ok){
         setSuccessEdit(true);
      }else{
         setSuccessEdit(false);
         alert('Error updating listing')
      }
   }

   return (
      <> 
         <div className={styles.addProduct}>
            <AddEditListing userId={userId} listing={listing} onSubmit={onSubmit} />
            {successEdit && (
               <div className={styles.success}>Success! Your edits have been applied successfully.</div>
            )}
         </div>
      </>
   )
}