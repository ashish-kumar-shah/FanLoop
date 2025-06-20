// middleware/upload.js

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define temp folder path
const tempDir = path.join(__dirname, "../temp");

// ✅ Ensure temp folder exists
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Set up multer storage (temp only, used before Cloudinary upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir); // ✅ Save to temp folder
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// Filter allowed file types (image/* and video/*)
const fileFilter = (req, file, cb) => {
  const isImage = file.mimetype.startsWith("image/");
  const isVideo = file.mimetype.startsWith("video/");
  if (isImage || isVideo) {
    cb(null, true);
  } else {
    cb(new Error("Only image and video files are allowed!"), false);
  }
};

// Max size: 100MB
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 },
});

module.exports = upload;
