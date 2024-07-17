'use client'

import styles from './AddProduct.module.css';

export default function EditProduct({ listing }){

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
         <div>Edit Product</div>
         <div className={styles.addProduct}>
            <form onSubmit={onSubmit}>
               <div className={styles.addProductInputs}>
                  <div><label htmlFor="name">Product Name</label></div>
                  <input defaultValue={listing?.name} id="name" type="text" name="name" placeholder="Product Name" />
               </div>
               <div className={styles.addProductInputs}>
                  <div><label htmlFor="desc">Description</label></div>
                  <textarea defaultValue={listing?.description} name="description" id="desc" placeholder="Product Description"></textarea>
               </div>
               <div className={styles.addProductInputs}>
                  <div><label htmlFor="price">Price</label></div>
                  <input defaultValue={listing?.price} id="price" type="text" name="price" placeholder="Price" />
               </div>
               
               <input defaultValue={listing?.id} type="hidden" name="id" />
               <button type="submit">Submit</button>
            </form>
         </div>
      </>
   )
}