// navbar is the common navbar of all categories 
// it contains search logo, search input field, userProfile image and create pin button

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();
    return (
      <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 ">
        <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-2xl">
          {/* show search logo */}
          <IoMdSearch fontSize={21} className="ml-1" />
          {/* search input field */}
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            value={searchTerm}
            onFocus={() => navigate('/search')}
            className="p-2 w-full bg-white outline-none"
          />
        </div>
        {/* User profile image  */}
        <div className="flex gap-8 w-1/3 justify-end">
          <Link to={`user-profile/${user?._id}`} className="hidden md:block">
            <img src={user?.image} referrerPolicy="no-referrer" alt="user-pic" className="w-14 h-12 rounded-lg shadow-2xl p-1 bg-gray-200" />
          </Link>

          {/* create pin plus button  */}
          <Link to="/create-pin" className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
            <IoMdAdd />
          </Link>
        </div> 
        {/* end of user profile image */}
      </div>
    );
};

export default Navbar;