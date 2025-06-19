const Post = require("../../Models/Post");
const User = require("../../Models/User");
const Follower = require("../../Models/Follower");
const Notification = require("../../Models/Notification");
const { emitNotification } = require("../../Socket");

const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const userId = req.user;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const content = req.files.map((file) => {
      const type = file.mimetype.startsWith("image") ? "image" : "video";
      const value = file.filename;
      const url = `${req.protocol}://${req.get("host")}/api/userpost/file/${encodeURIComponent(file.filename)}`;
      return { type, value, url };
    });

    const post = await Post.create({ user: userId, caption, content });
    await User.findByIdAndUpdate(userId, { $inc: { postCount: 1 } });

    const celeb = await User.findById(userId);
    if (celeb?.role === "celebrity") {
      const followers = await Follower.find({ following: userId }).populate("follower", "_id");

      for (const f of followers) {
        const followerId = f.follower._id.toString();
        const message = `${celeb.name} posted new content!`;

        // Send real-time notification via socket
        emitNotification(followerId, {
          message, 
          postId: post._id,
          username: celeb.username,
        });
  
        // Save notification in DB
        await Notification.create({
          userId: followerId,
          postId: post._id,
          message,
          fromUserId: userId,
        });
      }
    }

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createPost };
