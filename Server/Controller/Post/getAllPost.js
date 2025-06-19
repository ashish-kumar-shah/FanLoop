const Post = require("../../Models/Post");
const User = require("../../Models/User");

const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username profilePic name role");

    const total = await Post.countDocuments();

    res.status(200).json({
      success: true,
      posts,
      hasMore: skip + posts.length < total,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};


module.exports = getAllPosts