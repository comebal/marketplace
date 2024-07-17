import SellerHomepage from '@/app/components/pages/seller/SellerHomepage';
import { getSellerData, getListings } from '../Seller.model';

export default async function Page({ params }) {

  const { user } = await getSellerData(params?.slug);
  const { listings } = await getListings(params?.slug);

  return <SellerHomepage user={user} listings={listings} />
}

