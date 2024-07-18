import { useState } from 'react';
import styles from './AddProduct.module.css';
import AddEditListing from '../../shared/AddEditListing';
import { isInt } from '../../../../../lib/utils';

export default function AddProduct({ userId }){
   const [successAdd, setSuccessAdd] = useState(false);

   const createListing = async (data) => {
      const newObject = {...data, user_id: Number(userId)}
      
      const listing = await fetch('/api/listing/add', {
        method: 'POST',
        body: JSON.stringify(newObject),
        cache: 'no-store',
      });
  
      if(listing?.ok){
        setSuccessAdd(true);
      }else{
        alert('Error adding listing')
        setSuccessAdd(false);
      }
    }

   const onSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData(e.target)
      const name = formData.get('name').trim();
      const description = formData.get('description').trim();
      const price = formData.get('price').trim();

      if(name === ''){
         alert('Enter product name');
      }else if(description === ''){
         alert('Enter product description');
      }else if(price === ''){
         alert('Enter product price');
      }else if(!isInt(price)){
         alert('Invalid product price');
      }else{
         createListing({ name, description, price });
      }
   }

   return (
      <>
         <div className={styles.addProduct}>
            <AddEditListing userId={userId} onSubmit={onSubmit} />
            {successAdd && (
               <div className={styles.success}>Success! Your listing has been added successfully.</div>
            )}
         </div>
      </>
   )
}