const path = require("path");
const fs = require("fs");

const getFile = (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, "../../uploads", filename);
  console.log(filepath);
  
  // Check if file exists
  fs.stat(filepath, (err, stats) => {
    if (err || !stats.isFile()) {
      return res.status(404).json({ error: "File not found" });
    }

    const ext = path.extname(filename).toLowerCase();
    const mimeMap = {
      ".mp4": "video/mp4",
      ".webm": "video/webm",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
    };

    const contentType = mimeMap[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });

    // Create a readable stream and pipe it to response
    const readStream = fs.createReadStream(filepath);
    readStream.pipe(res);

    // Handle stream error
    readStream.on("error", (streamErr) => {
      console.error("Stream error:", streamErr);
      res.status(500).end("Internal Server Error");
    });
  });
};

module.exports = { getFile };
