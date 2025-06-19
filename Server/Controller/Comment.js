const Comment = require("../Models/Comment");

exports.addComment = async (req, res) => {
  try {
    const { postId, text } = req.body;
    const userId = req.user;

    const comment = await Comment.create({ postId, userId, text });
    const populated = await comment.populate("userId", "username profilePic");
    res.status(201).json({ success: true, comment: populated });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to add comment" });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId })
      .populate("userId", "username profilePic")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch comments" });
  }
};
