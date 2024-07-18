'use client'

import { useState, useEffect } from "react";
import ListingItem from "./components/shared/ListingItem";
import Image from "next/image";
import styles from "./page.module.css";
import cx from "classnames";
import { getCookie, setCookie } from "../../lib/utils";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [fromSearch, setFromSearch] = useState(false);
  const [userCookie, setUserCookie] = useState();

  useEffect(() => {
    if(getCookie('user') === null){

      //set default
      setCookie('user', JSON.stringify({userId: 6, name: 'Bernadette'}), 7);
    }
    setUserCookie(JSON.parse(getCookie('user')));
  }, []);

  const onSubmit = async (e) => {

    e.preventDefault(); 

    setIsLoading(true);
    
    const formData = new FormData(e.target)
    const search = formData.get('search');

    const findListings = await fetch('/api/listing/search', {
      method: 'POST',
      body: JSON.stringify({ search }),
    });

    setIsLoading(false);
    setFromSearch(true);

    if(findListings?.ok){
      const data = await findListings.json();
      setListings(data?.listings?.listings)
    }else{
      // ADD ERROR MESSAGE
    }    
  }

  return (
    <div className={styles.container}>
      <div className={styles.userContent}>
        <div>{userCookie?.name ? `Hi ${userCookie?.name}` : ''}</div>
        <div className={styles.userContentLinks}><a href='/purchases'>My Purchases</a> <a href="/switch">Switch user</a></div>
      </div>
      <form onSubmit={onSubmit}>
        <div className={styles.form}>
          <input id="name" type="text" name="search" placeholder="Search" className={styles.searchInput} />
          <button type="submit" className={cx(styles.searchBtn, { [styles.loading]: loading })}>
            {loading && <Image alt='spinner' src='/assets/loading-spinner.gif' width={20} height={20} />}
            Search
          </button>
        </div>
      </form>

      <div className={styles.searchResults}>
        
        {fromSearch && listings.length === 0 && (
          <div className={styles.empty}>Sorry, we couldn't find any results matching your search.</div>
        )}

        {listings.length > 0 && (
          <>
            <div className={styles.searchLabel}>Search Results:</div>
            <div className={styles.searchContainer}>
              {listings.length > 0 && (
                listings.map((listing) => <ListingItem listing={listing} />)
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
