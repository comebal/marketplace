import styles from './Purchase.module.css';
import { formatter } from '../../../../../lib/utils';

export default function Purchases({ listings }){

   return (
      <div className={styles.container}>
         <a href='/' className={styles.link}>&lt; Back to home</a>
         <div className={styles.title}>My Purchases</div>
            {listings && listings.length > 0 && (
               <div className={styles.tableContainer}>
                  <table>
                     <tbody>
                        <tr>
                           <th>Listing</th>
                           <th>Purchase type</th>
                           <th>Price</th>
                           <th>View</th>
                        </tr>
                        {listings && listings.map((listing, index) => (
                           <tr key={index}>
                              <td>{listing.name}</td>
                              <td>{listing.purchase_type}</td>
                              <td>{formatter.format(listing.price)}</td>
                              <td><a className={styles.link} href={`/listing/${listing?.id}`}>Link</a></td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            )}
            {listings.length === 0 && (
               <div className={styles.empty}>You havent bought anything yet.</div>
            )}
      </div>
   )
}