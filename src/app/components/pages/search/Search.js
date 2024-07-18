import Link from 'next/link'
export default function Search({ listings }){
   
   return (
      <>
         <div>Search Results:</div>
         {listings.map((item, index) => (
            <div key={index}><Link href={`/listing/${item.id}`}>{item?.name}</Link></div>
         ))}
      </>
   )
}