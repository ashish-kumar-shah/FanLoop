import React ,{useContext} from 'react'
import { AppContext } from '../Context/AppContext';

const LogOut = () => {
    const {logout, authDispatch} = useContext(AppContext) 
    const handleLogout = () => {
    logout()
      .then(() => authDispatch({ type: "LOGOUT" }))
      .catch(console.error);
  };
  return (
    <div
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer border shadow-sm hover:bg-red-600 hover:text-white transition-all"
        >
          <span className="material-symbols-outlined text-xl">logout</span>
          <span className="text-base">Log Out</span>
        </div>
  )
}

export default LogOut