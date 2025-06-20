const cloudinary = require("../../Utils/cloudinary");
const fs = require("fs");
const User = require("../../Models/User");

const updateProfilePic = async (req, res) => {
  try {
    const userId = req.user;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.mimetype)) {
      return res.status(400).json({ success: false, message: "Invalid image type" });
    }

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "fanloop-profiles",
    });

    fs.unlinkSync(file.path); // delete temp file

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.profilePic = result.secure_url;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      profilePic: result.secure_url,
    });
  } catch (error) {
    console.error("Update Profile Pic Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = updateProfilePic;
