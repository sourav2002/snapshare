// this search button is used in Navbar.jsx file on the top level of all pin category
// it takes a string and search query using data.js file
// initially it shows loading spinner  and after that show relevan data according to query

import React, { useEffect, useState } from 'react';
import MasonryLayout from './MasonryLayout';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import Spinner from './Spinner';

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    // if search string is not empty 
    if (searchTerm !== '') {
      // first of all, show loader 
      setLoading(true);
      // search query in database
      const query = searchQuery(searchTerm.toLowerCase());
      // fetch the query from sanity database using client.js 
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false); // stop loader now
      });
    } else {
      // if search data if now matching then show rest pins.
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);// only render is search field is changed.

  return (
    <div>

      {/* while page is loading then show spinner with passed massage */}
      {loading && <Spinner message="Searching pins" />}
      {/* if pins are not empty then show pins */}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {/* if loading has stopped and our search query is not empty but there is no pins available then show no pin found */}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
    </div>
  );
};

export default Search;