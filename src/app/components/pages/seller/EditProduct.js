'use client'

import styles from './AddProduct.module.css';
import AddEditListing from '../../shared/AddEditListing';

export default function EditProduct({ listing, userId }){

   const onSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData(e.target)
      const name = formData.get('name');
      const description = formData.get('description');
      const price = formData.get('price');
      const id = listing?.id;

      editListing({ id, name, description, price });
   }

   const editListing = async (data) => {
      const listing = await fetch('/api/listing/edit', {
        method: 'POST',
        body: JSON.stringify(data),
      });
  
      if(listing?.ok){
        // ADD SUCCESS MESSAGE
        alert('Success Edit')
      }else{
        // ADD ERROR MESSAGE
      }
   }

   return (
      <> 
         <div className={styles.addProduct}>
            <AddEditListing userId={userId} listing={listing} onSubmit={onSubmit} />
         </div>
      </>
   )
}