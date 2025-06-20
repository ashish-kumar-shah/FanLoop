import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const Tabs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {User}= useContext(AppContext)
  const tabs = [
    { name: "home", label: "Home", icon: "home", path: "/" },
     {
      name: "search",
      label: "search",
      icon: "search",
      path: "/search",
    },
   
    {
      name: "Create",
      label: "createpost",
      icon: "add_circle",
      path: "/createpost",
    },
    {
      name: "feed",
      label: "feed",
      icon: "animated_images",
      path: "/feed",
    },
    { name: "profile", label: "Profile", icon: "person", path: `/profile/${User?.user?.username}` },

    
  ];

  return (
    <div className=" w-full border flex  gap-1 items-center justify-evenly p-1 ">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;

        return (
          <div
            key={tab.name}
            onClick={() => navigate(tab.path)}
            className={`cursor-pointer w-fit  h-fit p-2 rounded-xl flex items-center gap-2 shadow-sm border transition-all 
              ${
                isActive
                  ? "bg-blue-100 border-blue-500 text-blue-700 font-medium"
                  : "bg-white hover:bg-gray-100 text-gray-700"
              }`}
          >
            <div className="w-10 h-10 flex justify-center items-center text-xl">
              <span className="material-symbols-outlined">{tab.icon}</span>
            </div>
           
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
