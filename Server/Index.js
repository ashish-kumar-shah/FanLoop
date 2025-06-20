const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const http = require("http");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

// Connect to DB
const connectToDB = require("./Config/Db");
connectToDB();

// Middleware
app.use(cors({
  origin: false, // Change this to your frontend origin in production
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

console.log(chalk.blue("🧠 Middleware and core configs loaded..."));

// API Routes
app.use("/api/auth/user", require("./Routes/User"));
app.use("/api/userpost", require("./Routes/Post"));
app.use("/api/user", require("./Routes/Services"));

// Health Check Route
app.get("/alive", (req, res) => {
  res.send("✅ FanLoop API is running.");
});

// React Frontend Handling
const clientBuildPath = path.join(__dirname, "../client/build");
console.log(clientBuildPath);

if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));

  // Use regex instead of "*" to avoid path-to-regexp crash
  app.get(/^\/(?!api).*/, (req, res) => {
    const indexHtml = path.join(clientBuildPath, "index.html");
    if (fs.existsSync(indexHtml)) {
      return res.sendFile(indexHtml);
    } else {
      return res.status(500).send("index.html not found.");
    }
  });
} else {
  console.warn(chalk.red("⚠️ React build folder not found. Skipping static file serving."));
}

// Start Socket.io server
const { initSocket } = require("./Socket");
const server = http.createServer(app);
initSocket(server);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(chalk.greenBright(`🚀 Server is running on http://localhost:${PORT}`));
  if (fs.existsSync(clientBuildPath)) {
    console.log(chalk.cyan("📦 React frontend served from /client/build"));
  }
  console.log(chalk.yellow("🛠️  API available at /api/... routes"));
});
