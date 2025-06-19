import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import serviceContext from "../Context/ServicesContext";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../Hooks/useSocket";

const Notification = () => {
  const { User } = useContext(AppContext);
  const {
    getNotifications,
    markNotificationsAsSeen,
    setNotifyCount,
  } = useContext(serviceContext);

  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  // Fetch unread notifications on mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data || []);
        setNotifyCount((data || []).length); // no need to filter anymore
      } catch (error) {
        console.error("Error loading notifications:", error);
      }
    };

    if (User?.user?._id) {
      fetchNotifications();
    }
  }, [User, getNotifications, setNotifyCount]);

  // Listen for real-time notifications via socket
  useSocket(User?.user?._id, (newNotification) => {
    setNotifications((prev) => [newNotification, ...prev]);
    setNotifyCount((prev) => prev + 1);
  });

  // When a notification is clicked
  const handleViewPost = async (postId, notificationId) => {
    try {
      if (!postId || !notificationId) return;

      await markNotificationsAsSeen(notificationId); // mark single as read

      setNotifications((prev) =>
        prev.filter((n) => n._id !== notificationId)
      );

      setNotifyCount((prev) => Math.max(0, prev - 1));

      const postIdStr = typeof postId === 'object' ? postId._id : postId;
      navigate(`/viewpost/${postIdStr}`);
    } catch (error) {
      console.error("Failed to mark notification as seen:", error);
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-start pt-4 bg-white">
      <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-4 max-h-[400px] overflow-y-auto scrollbar-thin space-y-2 w-full max-w-lg">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-base font-semibold text-gray-800">Notifications</h2>
        </div>

        {notifications.length === 0 ? (
          <div className="text-sm text-gray-600 py-2">No new notifications.</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n._id}
              onClick={() => handleViewPost(n.postId, n._id)}
              className="cursor-pointer group border rounded-md p-3 transition-shadow hover:shadow-md bg-blue-50 border-blue-100"
            >
              <p className="text-sm text-gray-800">
                <span className="font-semibold text-blue-600">
                  {n?.fromUserId?.username || "User"}
                </span>{" "}
                {n.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notification;
