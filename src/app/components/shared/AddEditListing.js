import styles from './AddEditListing.module.css';

export default function AddEditListing({ listing, onSubmit, userId }){
   return (
      <>
         <div>
            <a href={`/seller/${userId}`} className={styles.back}>&lt; Go Back</a>
            <form className={styles.formContainer} onSubmit={onSubmit}>
               <table>
                  <tbody>
                     <tr>
                        <td><label htmlFor="name">Product Name</label></td>
                        <td><input defaultValue={listing?.name} id="name" type="text" name="name" placeholder="Product Name" /></td>
                     </tr>
                     <tr>
                        <td><label htmlFor="name">Description</label></td>
                        <td><textarea defaultValue={listing?.description} name="description" id="desc" placeholder="Product Description"></textarea></td>
                     </tr>
                     <tr>
                        <td><label htmlFor="name">Price</label></td>
                        <td><input defaultValue={listing?.price} id="price" type="text" name="price" placeholder="Price" /></td>
                     </tr>
                     <tr>
                        <td></td>
                        <td className={styles.submitContainer}>
                           <input defaultValue={listing?.id} type="hidden" name="id" />
                           <button type="submit">Submit</button>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </form>
         </div>
      </>
   )
}