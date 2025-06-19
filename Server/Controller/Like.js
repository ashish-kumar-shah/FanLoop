const Like = require("../Models/Like");

exports.toggleLike = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user;

    const existing = await Like.findOne({ postId, userId });
    if (existing) {
      await existing.deleteOne();
      return res.status(200).json({ success: true, liked: false });
    } else {
      await Like.create({ postId, userId });
      return res.status(201).json({ success: true, liked: true });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to toggle like" });
  }
};

exports.getLikesByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const likes = await Like.find({ postId });
    res.status(200).json({ success: true, count: likes.length });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch likes" });
  }
};
