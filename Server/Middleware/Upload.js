const multer = require("multer");
const path = require("path");

// Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// File filter: allow all image/* and video/* types
const fileFilter = (req, file, cb) => {
  const allowedImage = file.mimetype.startsWith("image/");
  const allowedVideo = file.mimetype.startsWith("video/");

  if (allowedImage || allowedVideo) {
    cb(null, true);
  } else {
    cb(new Error("Only image and video files are allowed!"), false);
  }
};

// Multer config
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit (optional, increase if needed)
  fileFilter,
});

module.exports = upload;
