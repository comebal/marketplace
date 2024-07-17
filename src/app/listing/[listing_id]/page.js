import { getIndividuaListing } from '@/app/seller/Seller.model';
import Listing from '@/app/components/pages/listing/Listing';

export default async function Page({ params }) {
   const { listing } = await getIndividuaListing(params?.listing_id);

   return (
      <Listing listing={listing} />
   )
}