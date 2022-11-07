import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Login } from './component';
import Home from './container/Home';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

    if (!User) navigate('/login');
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;


// import React, { useEffect, useState } from "react";
// import { Routes, Route, useNavigate } from "react-router-dom";

// import { CreatePin, Feed, Login, PinDetail, Search, UserProfile } from "./component";
// import Home from "./container/Home";
// import MainLayout from "./container/MainLayout";

// const App = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const user =
//       localStorage.getItem("user") !== "undefined"
//         ? JSON.parse(localStorage.getItem("user"))
//         : localStorage.clear();
//       setUser(user);

//     if (!user) navigate("/login");
//   }, []);

//   return (
//     <Routes>
//       <Route path="login" element={<Login />} />
//       <Route path="/" element={
//         <MainLayout>
//           <Feed user={user} />
//         </MainLayout>
//       } 
//       />
//       <Route 
//         path="/category/:categoryId"
//         element={
//           <MainLayout>
//             <Feed user={user} />
//           </MainLayout>
//         } />
//       <Route
//         path="/pin-detail/:pinId"
//         element={
//           <MainLayout>
//             <PinDetail user={user && user} />
//           </MainLayout>
//         }
//       />
//       <Route
//         path="/create-pin"
//         element={
//           <MainLayout>
//             <CreatePin key={user && user} user={user && user} />
//           </MainLayout>
//         }
//       />
//       <Route path="/user-profile/:userId" element={<UserProfile />} />
//       {/* <Route path="/" element={<Home />} /> */}
//     </Routes>
//   );
// };

// export default App;
