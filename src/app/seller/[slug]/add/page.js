'use client'

import AddProduct from '@/app/components/pages/seller/AddProduct';

export default function Page({ params }) {

  return (
    <AddProduct userId={params?.slug} />
  )
}
