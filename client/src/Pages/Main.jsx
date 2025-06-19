import React from 'react';
import SideBar from '../Component/SideBar';
import { Outlet } from 'react-router-dom';
import Navbar from '../Component/HomeElement/Navbar';
import MobileTab from "../Component/MobileTabs";

const Main = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* Fixed Navbar height */}
      <div className="h-16 w-full shrink-0">
        <Navbar />
      </div>

      <div className="w-full flex-1 flex overflow-hidden bg-gray-100">
        {/* Sidebar (can be hidden on mobile) */}
        <SideBar />

        {/* Main Outlet content */}
        <div className="flex-1 overflow-y-auto hide-scrollbar pb-16 md:pb-0">
          <Outlet />
        </div>
      </div>

      {/* Fixed MobileTab only for small screens */}
      <div className="w-full h-16 fixed bottom-0 left-0 bg-white md:hidden border-t border-gray-200">
        <MobileTab />
      </div>
    </div>
  );
};

export default Main;
