'use client'

import styles from './Switch.module.css';
import { setCookie } from '../../../../../lib/utils';

export default function SwitchUsers(){

   const updateUser = (user) => {
      setCookie('user', JSON.stringify(user), 7);
      window.location = '/';
   }

   return (
      <div className={styles.container}>
         <div className={styles.entry}>
            <div className={styles.title}>Seller list</div>
            <div className={styles.entryContent}>
               <div>1. <a href='/seller/1'>Ben</a></div>
               <div>2. <a href='/seller/2'>Jasper</a></div>
               <div>3. <a href='/seller/3'>Rhanja</a></div>
               <div>4. <a href='/seller/4'>Angela</a></div>
               <div>5. <a href='/seller/5'>Jao</a></div>
            </div>
         </div>
         <div className={styles.entry}>
            <div className={styles.title}>Buyer list</div>
            <div className={styles.entryContent}>
               <div className={styles.buyer} onClick={() => updateUser({userId: 6, name: 'Bernadette'})}>1. Bernadette</div>
               <div className={styles.buyer} onClick={() => updateUser({userId: 7, name: 'Donna'})}>2. Donna</div>
               <div className={styles.buyer} onClick={() => updateUser({userId: 8, name: 'Joo'})}>3. Joo</div>
               <div className={styles.buyer} onClick={() => updateUser({userId: 9, name: 'Mariz'})}>4. Mariz</div>
               <div className={styles.buyer} onClick={() => updateUser({userId: 10, name: 'Roseanne'})}>5. Roseanne</div>
            </div>
         </div>
      </div>
   )
}