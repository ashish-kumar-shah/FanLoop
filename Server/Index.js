const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const chalk = require("chalk");
const path = require("path");
const http = require("http");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

// Connect to DB
const connectToDB = require("./Config/Db");
connectToDB();

// Middlewares
app.use(cors({
  origin: false, // disables CORS because same-origin
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Log server start
console.log(chalk.blue("🧠 Middleware and core configs loaded..."));

// API Routes
app.use("/api/auth/user", require("./Routes/User"));
app.use("/api/userpost", require("./Routes/Post"));
app.use("/api/user", require("./Routes/Services"));

// Default API route
app.get("/alive", (req, res) => {
  res.send("✅ FanLoop API is running.");
});

// ===== Serve React Frontend (build folder) =====
const clientBuildPath = path.join(__dirname, "../client/build");
app.use(express.static(clientBuildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// Socket.io Server
const { initSocket } = require("./Socket");
const server = http.createServer(app);
initSocket(server);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(chalk.greenBright(`🚀 Server is running on http://localhost:${PORT}`));
  console.log(chalk.cyan("📦 React frontend served from /client/build"));
  console.log(chalk.yellow("🛠️  API available at /api/... routes"));
});
