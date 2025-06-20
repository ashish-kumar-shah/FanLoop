// src/hooks/useSocket.js
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const useSocket = (userId, onNotification) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const socket = io("http://localhost:5000", {
      query: { userId },
      transports: ["websocket"],
    });

    socket.on("newPostNotification", (data) => {
      console.log("Notification received:", data);
      if (onNotification) onNotification(data);
    });

    socketRef.current = socket;

    return () => socket.disconnect();
  }, [userId]);

  return socketRef.current;
};
