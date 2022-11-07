import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import logo from "../assets/snapsharelightmode.svg";
import { categories } from "../utils/data";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({ closeToggle, user }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false); // we are check if closeToggel exist because 
    // it is possible that we don't have to close the sidebar in full screen mode.
  };

  // whereever handleCloseSideBar is used on onClick, 
  // its mean we have to close the sidebar after clicking on any one of the categorys.


  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        {/* sidebar logo and onclick redirect at homepage */}
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} referrerPolicy="no-referrer" alt="logo" className="w-full" /> 
        </Link>
        {!user && 
           <Link to='/login'>
            <h2 className="text-lg font-bold tracking-wide  m-3">Login</h2>
           </Link>
           }
        <div className="flex flex-col gap-5">

          {/* home buttono link with className active or not  */}
          <NavLink
            end
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>

          {/* Other discover category */}
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover cateogries
          </h3>
          {/* Get categoreis from data.js and iterate through it. */}
          {categories.slice(0, categories.length - 1).map((category) => (
            // redirect to respective url and also add active or not active state
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              {/* fetching images from category object. */}
              <img
                alt={`${categories.name}`}
                referrerPolicy="no-referrer"
                src={category.image}
                className="w-8 h-8 rounded-full shadow-sm"
              />
              {/* Name of the category */}
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* if user exists, then show them button to open their profile */}
      {user && (
        // redirect to profile url
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          {/* fetch imgae of user */}
          <img
            src={user?.image}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
            referrerPolicy="no-referrer"
          />
          {/* fetch name of user */}
          <p>{user.userName}</p>
          {/* Forward arrow logo */}
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
