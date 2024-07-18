import styles from './AddProduct.module.css';
import AddEditListing from '../../shared/AddEditListing';

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
         <div className={styles.addProduct}>
            <AddEditListing userId={userId} onSubmit={onSubmit} />
         </div>
      </>
   )
}