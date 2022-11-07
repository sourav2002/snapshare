// import React, { useState, useEffect } from "react";
// import { HiMenu } from "react-icons/hi";
// import { AiFillCloseCircle } from "react-icons/ai";
// import { Link } from "react-router-dom";

// import { userQuery } from "../utils/data";
// import { client } from "../client";
// import logo from "../../../assets/snapsharelightmode.svg";
// import Sidebar from "./Sidebar";

// const MainSideBar = () => {
//   //useState to update dom
//   // here 1st parameter is used to get current state and second parameter is used to update current state value
//   const [toggleSidebar, setToggleSidebar] = useState(false); // initially, togglesidebar is set to false.
//   const [user, setUser] = useState();

//   // getting object (json formatted) user data from local storage.
//   const userInfo =
//     localStorage.getItem("user") !== "undefined"
//       ? JSON.parse(localStorage.getItem("user"))
//       : localStorage.clear(); // if data exsit then return it in json format other wise clear local storage.

//   // it is a hook of reactjs same as componentDidMount used for updating 
//   useEffect(() => {
//     // userQuery is a function which return all the users matching query (here query is user google id)
//     const query = userQuery(userInfo?.googleId);

//     // client is a seprate js file which is used to connect our frontend with backend
//     // here we are fetchig user from our database which matches the passed query.
//     client.fetch(query).then((data) => {
//       setUser(data[0]); 
//     }).then(console.log("error caught........"))
//   }, []);

//   return (
//     <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
//       {/* initially, hide sidebar. Because we have to show it only when user click on #1 navbar button Hamburger */}
//       <div className="hidden md:flex h-screen flex-initial">
//         <Sidebar user={user && user} />
//       </div>

//       {/* Main content */}
//       <div className="flex md:hidden flex-row">
//         {/* top nav bar  */}
//         <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
//           {/* # 1 */}
//           <HiMenu
//             fontSize={40}
//             className="cursor-pointer"
//             onClick={() => setToggleSidebar(true)}
//           />

//           {/* # 2 */}
//           <Link to="/">
//             <img referrerPolicy="no-referrer" src={logo} alt="logo" className="w-28" />
//           </Link>

//           {/* # 3 */}
//           {user && 
//           <Link to={`user-profile/${user?._id}`}>
//             {/* fetching image from user (sanity) */}
//             <img
//               src={user.image}
//               referrerPolicy="no-referrer"
//               alt="user-pic"
//               className="w-9 h-9 rounded-full "
//             />
//           </Link>}
//           {!user && 
//            <Link to='/login'>
//             <h2 className="m-3">Login</h2>
//            </Link>
//            }
//         </div>

//         {/* toggle slidebar is connected with #1_navbar && if it is true (onclick on button #1) */}
//         {toggleSidebar && (
//           <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
//             <div className="absolute w-full flex justify-end items-center p-2">
//               {/* togglebar will open sidebar with animation (animae-slide-in) and also show a button to close it. */}
//               {/* close sidebar button */}
//               <AiFillCloseCircle
//                 fontSize={30}
//                 className="cursor-pointer"
//                 onClick={() => setToggleSidebar(false)}
//               />
//             </div>
//             {/* show sidebar component */}
//             <Sidebar closeToggle={setToggleSidebar} user={user && user} />
//           </div>
//         )}
//       </div>

//       {/* show main home page in every condition, if we click on profile image, redirect to profile url otherwise show pins. */}
//       {/* Link to component using Route */}
//     </div>
//   );
// };

// export default MainSideBar;
