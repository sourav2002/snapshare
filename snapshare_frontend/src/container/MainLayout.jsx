import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import MainSideBar from "../component/common/SidebarLayout";
import { useNavigate } from "react-router-dom";


const MainLayout = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user =
      localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear();
      setUser(user)

    if (!user) navigate("/login");
  }, []);

  if(!user) {
    return <div>loading</div>
  }

  return (
    <div className="px-2 md:px-5 flex flex-row">
      <div className="bg-gray-50">
        {/* show navbar and pass props as searchTerm, setSearchTerm, and user. */}
        {/* navbar is common among all shared urls like PinDetail, createPin, feed etc. We always have to show navbar */}
        <MainSideBar />
       
      </div>
      <div className="h-full w-full">
      <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user}
        />
        {children}
        </div>
    </div>
  );
};

export default MainLayout;
