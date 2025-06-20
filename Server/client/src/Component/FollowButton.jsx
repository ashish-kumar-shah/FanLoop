import React, { useContext, useEffect, useState } from "react";
import serviceContext from "../Context/ServicesContext";

const FollowButton = ({ id ,style}) => {
  const { createFollower, getFollowing } = useContext(serviceContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if already following this user
  useEffect(() => {
    const checkFollowing = async () => {
      try {
        const followingList = await getFollowing();
        const alreadyFollowing = followingList.some(user => user._id === id);
        setIsFollowing(alreadyFollowing);
      } catch (error) {
        console.error("Error checking following status:", error);
      }
    };

    checkFollowing();
  }, [id, getFollowing]);

  const followUser = async () => {
    if (isFollowing || loading) return;

    try {
      setLoading(true);
      const res = await createFollower(id);
      if (res?.success) {
        setIsFollowing(true);
      }
    } catch (err) {
      console.error("Follow error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="box-1 w-full h-full text-right">
      <button
        disabled={isFollowing || loading}
        onClick={followUser}
        className={`${style}||px-6 py-1.5 text-center rounded-md border-2 font-semibold transition-colors duration-500 ease-linear p-2 ${
          isFollowing
            ? "border-gray-400 text-gray-400 cursor-not-allowed"
            : "border-gray-950 text-gray-950 hover:bg-gray-900 hover:text-white"
        }`}
      >
        {isFollowing ? "Following" : loading ? "Following..." : "Follow"}
      </button>
    </div>
  );
};

export default FollowButton;
