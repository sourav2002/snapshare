import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams(); // useParam is given by react-router-dom

  // we have to show feed according to category.
  // so we will search for category id and pass into query.
  // then fetch the data from sanity server according to resultant query
  // and setPins using useState hook.
  useEffect(() => {
    if (categoryId) {
      // show the loader while fetching data from server
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        // stop loading after successfully fetching data
        setLoading(false);
      });
    } else {
      // else show loader as no pin has been founded
      setLoading(true);
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        // as query search is finised, now stop loader
        setLoading(false);
      });
    }
  }, [categoryId]);
  // dynamic name to show in spinner message
  const ideaName = categoryId || "new";

  // while it is loading, show loading message using spinner
  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    );
  }
  return (
    <div>
      {/* if pins exists */}
      {pins && <MasonryLayout pins={pins} />}
    </div>
  );
};

export default Feed;
