import Purchases from "../components/pages/purchases/Purchases"
import { findPurchases } from "../seller/Seller.model"

export default async function Page(){
   const { listings } = await findPurchases(2);
   return (
      <Purchases listings={listings} />
   )
}