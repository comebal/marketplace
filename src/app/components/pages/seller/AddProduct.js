import styles from './AddProduct.module.css';

export default function AddProduct({ userId, createListing }){

   const onSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData(e.target)
      const name = formData.get('name');
      const description = formData.get('description');
      const price = formData.get('price');

      createListing({ name, description, price });
   }

   return (
      <>
         <a href={`/seller/${userId}`}>Go back</a>
         <div>Add Product</div>
         <div className={styles.addProduct}>
            <form onSubmit={onSubmit}>
               <div className={styles.addProductInputs}>
                  <div><label htmlFor="name">Product Name</label></div>
                  <input id="name" type="text" name="name" placeholder="Product Name" />
               </div>
               <div className={styles.addProductInputs}>
                  <div><label htmlFor="desc">Description</label></div>
                  <textarea name="description" id="desc" placeholder="Product Description"></textarea>
               </div>
               <div className={styles.addProductInputs}>
                  <div><label htmlFor="price">Price</label></div>
                  <input id="price" type="text" name="price" placeholder="Price" />
               </div>
               
               <button type="submit">Submit</button>
            </form>
         </div>
      </>
   )
}