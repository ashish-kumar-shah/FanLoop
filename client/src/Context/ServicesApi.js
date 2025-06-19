import { useState } from "react";
import {
  getUserProfile,
  searchUserByQuery,
  createFollower,
  getFollowing,
  updateEmail,
  updateName,
  updateProfilePic,
  getPostById,dummyAccount,
  getNotifications,markNotificationsAsSeen,addComment,getLikes,toggleLike,getComments
} from "../API/ServiceApi";
import serviceContext from "./ServicesContext";


const ServicesApi = ({ children }) => {
  const [notifyCount,setNotifyCount] = useState(0)
  return (
    <serviceContext.Provider
      value={{
        notifyCount,setNotifyCount,
        getUserProfile,
        searchUserByQuery,
        createFollower,
        getFollowing,
        updateEmail,
        updateName,
        updateProfilePic,
        getPostById,
       
        getNotifications,
       markNotificationsAsSeen,
        dummyAccount,addComment,getLikes,toggleLike,getComments
      }}
    >
      {children}
    </serviceContext.Provider>
  );
};

export default ServicesApi;
