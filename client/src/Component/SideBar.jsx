import React from 'react'
import CompanyName from './CompanyName'
import Tabs from './Tabs'

const SideBar = () => {
  return (
     <div className="box-1 h-full border w-1/6 tabs logo md:flex flex-col bg-white hidden ">
     <div className="section-1 w-full  p-1 min-h-16 flex justify-center items-center  ">
        <CompanyName/>
        
     </div>
     <div className="section-2 w-full  p-1 h-full pt-6">
      <Tabs/>
     </div>
    

    </div>
  )
}

export default SideBar