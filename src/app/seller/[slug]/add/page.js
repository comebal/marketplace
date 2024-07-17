'use client'

import AddProduct from '@/app/components/pages/seller/AddProduct';

export default function Page({ params }) {

  const createListing = async (data) => {
    const newObject = {...data, user_id: Number(params?.slug)}
    
    const listing = await fetch('/api/listing/add', {
      method: 'POST',
      body: JSON.stringify(newObject),
    });

    if(listing?.ok){
      // ADD SUCCESS MESSAGE
      alert('Successfully added listing')
    }else{
      // ADD ERROR MESSAGE
    }
  }

  return (
    <AddProduct userId={params?.slug} createListing={createListing} />
  )
}
