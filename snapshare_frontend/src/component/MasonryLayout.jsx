// masonary is the structure from individual units.
// if pins exists or they are not empty, show the pin.jsx file with props key and pin
// change the masonary layout according to window screen size.(to make it dynamic)

import React from 'react';
import Masonry from 'react-masonry-css';
import Pin from './Pin';

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ pins }) => (
  <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointColumnsObj}>
    {pins?.map((pin) => <Pin key={pin._id} pin={pin} className="w-max" />)}
  </Masonry>
);

export default MasonryLayout;