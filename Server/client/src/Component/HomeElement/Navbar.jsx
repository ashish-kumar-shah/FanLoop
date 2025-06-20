import React, { useContext } from "react";
import serviceContext from "../../Context/ServicesContext";
import { AppContext } from "../../Context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { useSocket } from "../../Hooks/useSocket";
import logo from './logo.png';

const Navbar = () => {
  const { notifyCount, setNotifyCount } = useContext(serviceContext);
  const { User } = useContext(AppContext);
  const navigate = useNavigate();

  // Listen for new notification via socket
  useSocket(User?.user?._id, () => {
    setNotifyCount((prev) => prev + 1);
  });

  return (
    <div className="w-full h-14 px-4 flex justify-between items-center bg-white shadow-sm fixed top-0 z-50 md:hidden">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
        <span className="text-sm font-semibold text-gray-700 truncate max-w-[100px]">
          @{User?.user?.username}
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Settings Button */}
        <Link to="/settings" className="p-2 rounded-full transition aspect-square">
          <span className="material-symbols-outlined text-[22px] text-gray-700">settings</span>
        </Link>

        {/* Notification Button */}
        <div
          className="relative p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
          onClick={() => navigate('/notifications')}
        >
          <span className="material-symbols-outlined text-[22px] text-gray-700">
            notifications
          </span>

          {/* Notification Badge */}
          {notifyCount > 0 && (
            <span className="absolute top-1.5 right-1.5 text-[10px] min-w-[16px] h-[16px] px-1 rounded-full bg-red-600 text-white flex items-center justify-center leading-none">
              {notifyCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
