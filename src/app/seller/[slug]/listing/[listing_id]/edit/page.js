import EditProduct from '@/app/components/pages/seller/EditProduct';
import { getIndividuaListing } from '@/app/seller/Seller.model';

export default async function Page({ params }) {

  const { listing } = await getIndividuaListing(params?.listing_id);

  return (
    <>
      <a href={`/seller/${params.slug}`}>Go Back</a>
      <EditProduct userId={params.slug} listing={listing} />
    </>
  )
}
