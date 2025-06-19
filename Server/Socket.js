// socket.js
const { Server } = require("socket.io");
let io;
const userSocketMap = new Map();

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "https://fanloop-web.onrender.com",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap.set(userId, socket.id);
    }

    socket.on("disconnect", () => {
      userSocketMap.forEach((value, key) => {
        if (value === socket.id) {
          userSocketMap.delete(key);
        }
      });
    });
  });
}

function emitNotification(toUserId, data) {
  if (!io) return;
  const socketId = userSocketMap.get(toUserId);
  if (socketId) {
    io.to(socketId).emit("newPostNotification", data);
  }
}

module.exports = {
  initSocket,
  emitNotification,
};
