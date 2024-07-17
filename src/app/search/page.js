import Search from "../components/pages/search/Search";
import { findListings } from "../seller/Seller.model";

export default async function Page({ searchParams }){
   const listings = await findListings(searchParams?.q);
   return <Search listings={listings?.listings} />
}