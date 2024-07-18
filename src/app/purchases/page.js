import Purchases from "../components/pages/purchases/Purchases"
import { findPurchases } from "../seller/Seller.model"
import { cookies } from 'next/headers'

export default async function Page(){
   const cookieStore = cookies();
   const user = JSON.parse(cookieStore.get('user').value);

   const { listings } = await findPurchases(user?.userId);
   return (
      <Purchases listings={listings} />
   )
}