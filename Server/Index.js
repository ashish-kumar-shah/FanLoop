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
  origin: false, // allow same-origin React frontend
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

// Default API health check
app.get("/alive", (req, res) => {
  res.send("✅ FanLoop API is running.");
});

// ===== React Frontend Handling =====
const clientBuildPath = path.join(__dirname, "./client/build");

if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));

  // Handle client-side routing
  app.get("*", (req, res) => {
    const indexHtmlPath = path.join(clientBuildPath, "index.html");
    if (fs.existsSync(indexHtmlPath)) {
      res.sendFile(indexHtmlPath);
    } else {
      res.status(404).send("React index.html not found.");
    }
  });
} else {
  console.warn(chalk.red("⚠️  client/build folder not found. React frontend will not be served."));
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
