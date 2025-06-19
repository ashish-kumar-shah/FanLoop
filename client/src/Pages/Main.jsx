import React from 'react'
import SideBar from '../Component/SideBar'
import { Outlet } from 'react-router-dom'
import Navbar from '../Component/HomeElement/Navbar'


const Main = () => {
  return (


    <>
            <Navbar/>
      <div className="w-full h-screen p-0 m-0 bg-gray-100 flex  gap-0.5 overflow-hidden hide-scrollbar">
   {/* sidebar */}
   
<SideBar/>
  

    <div className="box-2 h-full  w-full overflow-auto hide-scrollbar">
      <Outlet/>
<div className="h-1/4  w-full shrink-0 bg-white md:hidden"></div>

    </div>

   </div>
    </>
 
  )
}

export default Main