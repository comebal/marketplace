import { getIndividuaListing, findBids } from '@/app/seller/Seller.model';
import Listing from '@/app/components/pages/seller/Listing';

export default async function Page({ params }) {
  const { listing } = await getIndividuaListing(params?.listing_id);
  const { bids } = await findBids(params?.listing_id);

  return (
    <Listing listing={listing} bids={bids} slug={params?.slug} />
  )
}
