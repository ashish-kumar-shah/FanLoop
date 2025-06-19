const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config();
const morgan  = require("morgan")
const chalk = require("chalk")
const ensureUploadsDir = require("./Utils/ensureUploadsDir");
const port = process.env.PORT || 5000;
const path = require("path")
const http = require("http");
const { initSocket } = require("./Socket");
const cookieParser = require("cookie-parser");
app.use(cookieParser());




app.use( 
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS","PATCH"],
  })
);
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Ensure uploads folder exists and serve it
const uploadPath = process.env.UPLOAD_PATH || path.join(__dirname, 'uploads');
ensureUploadsDir(uploadPath);
app.use('/uploads', express.static(uploadPath));


app.use(morgan("dev")),


app.use("/api/auth/user",require("./Routes/User"))
app.use("/api/userpost",require("./Routes/Post"))
app.use("/api/user",require("./Routes/Services"))


// database connection
const connectToDB = require("./Config/Db")
connectToDB()

app.get("/", (req, res) => {
    res.send("Hello World")
})




const server = http.createServer(app);
initSocket(server);

server.listen(port, () => {
  console.log(chalk.green(`🚀 Server running on http://localhost:${port}`));
});