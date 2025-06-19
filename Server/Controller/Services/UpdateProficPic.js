const User = require('../../Models/User');

const updateProfilePic = async (req, res) => {
  try {
    const userId = req.user;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    // Validate file type (image only)
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.mimetype)) {
      return res.status(400).json({ success: false, message: "Invalid image type" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Match URL format of Post content:
    const imageUrl = `${req.protocol}://${req.get("host")}/api/userpost/file/${encodeURIComponent(file.filename)}`;
    user.profilePic = imageUrl;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      profilePic: imageUrl,
    });

  } catch (error) {
    console.error("Update Profile Pic Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = updateProfilePic;
