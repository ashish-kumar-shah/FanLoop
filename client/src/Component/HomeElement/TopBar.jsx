import React, { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'

const TopBar = () => {
    const {User} = useContext(AppContext)
  
    
  return (
    <div className="w-full h-fit border p-2 bg-white">
      <div className="User-avtar user-name w-fit h-fit  p-2 flex flex-col justify-center items-center">
        <img
          src={User?.user?.profilePic}
          alt="avtar"
          className="w-16 h-16 rounded-full p-1 object-cover object-top"
        />
        <span className='font-semibold font-sans text-sm'>{User?.user?.username}</span>
      </div>
    </div>
  );
}

export default TopBar