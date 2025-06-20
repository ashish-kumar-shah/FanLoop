// Server/Config/Db.js
const mongoose = require("mongoose");
require("dotenv").config();
const connectToDB = async () => {
  const MONGO_URI = process.env.DB_URI ;

  const connect = async () => {
    try {
      await mongoose.connect(MONGO_URI, { dbname: "fanloop" });

      console.log("✅ Connected to MongoDB");
    } catch (error) {
      console.error("❌ Initial MongoDB connection failed. Retrying in 5s...");
      setTimeout(connect, 5000); // Retry after 5s
    }
  };

  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB disconnected. Reconnecting...");
    connect();
  });

  mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

  await connect();
};

module.exports = connectToDB;
