import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import serviceContext from "../Context/ServicesContext";
import LogOut from "./LogOut";

const Tabs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { User } = useContext(AppContext);
  const {
    getNotifications,
    markNotificationsAsSeen,
    notifyCount,
    setNotifyCount,
  } = useContext(serviceContext);

  // On mount: get unseen count once
  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const notifications = await getNotifications();
        const unseen = notifications.filter((n) => !n.seen).length;
        setNotifyCount(unseen);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };
    fetchUnread();
  }, [getNotifications, setNotifyCount]);

  const handleNavigate = async (path, isNotificationTab = false) => {
    if (isNotificationTab) {
      await markNotificationsAsSeen();
      setNotifyCount(0);
    }
    navigate(path);
  };

  const tabs = [
    { name: "home", label: "Home", icon: "home", path: "/" },
    {
      name: "profile",
      label: "Profile",
      icon: "person",
      path: `/profile/${User?.user?.username}`,
    },
    {
      name: "Create",
      label: "Create Post",
      icon: "add_circle",
      path: "/createpost",
    },
    { name: "feed", label: "Feed", icon: "animated_images", path: "/feed" },
    { name: "search", label: "Search", icon: "search", path: "/search" },
    {
      name: "notifications",
      label: "Notifications",
      icon: "notifications",
      path: "/notifications",
      count: notifyCount,
    },
    { name: "settings", label: "Settings", icon: "settings", path: "/settings" },
  ];

 

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden sm:flex flex-col gap-2 w-full px-3 py-4">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <div
              key={tab.name}
              onClick={() =>
                handleNavigate(tab.path, tab.name === "notifications")
              }
              className={`relative flex items-center gap-3 p-3 rounded-lg cursor-pointer border shadow-sm transition-all ${
                isActive
                  ? "bg-blue-100 border-blue-500 text-blue-700 font-medium"
                  : "bg-white hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="relative">
                <span className="material-symbols-outlined text-xl">
                  {tab.icon}
                </span>
                {tab.name === "notifications" && tab.count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center leading-none">
                    {tab.count > 99 ? "99+" : tab.count}
                  </span>
                )}
              </div>
              <span className="text-base">{tab.label}</span>
            </div>
          );
        })}

        {/* Logout (desktop only) */}
        <LogOut/>
      </div>

      {/* 📱 Mobile Bottom Navbar — optional, let me know if you want it */}
    </>
  );
};

export default Tabs;
