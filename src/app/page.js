'use client'

import styles from "./page.module.css";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const onSubmit = (e) => {

    const formData = new FormData(e.target)
    const search = formData.get('search');
    router.push(`/search?q=${search}`);

    e.preventDefault(); 
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input id="name" type="text" name="search" placeholder="Search" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
