const cloudinary = require("../../Utils/cloudinary");
const fs = require("fs");
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

    const content = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: file.mimetype.startsWith("video") ? "video" : "image",
        folder: "fanloop-posts",
      });

      const type = file.mimetype.startsWith("image") ? "image" : "video";
      content.push({ type, value: result.public_id, url: result.secure_url });

      fs.unlinkSync(file.path); // clean temp file
    }

    const post = await Post.create({ user: userId, caption, content });
    await User.findByIdAndUpdate(userId, { $inc: { postCount: 1 } });

    const celeb = await User.findById(userId);
    if (celeb?.role === "celebrity") {
      const followers = await Follower.find({ following: userId }).populate("follower", "_id");

      for (const f of followers) {
        const followerId = f.follower._id.toString();
        const message = `${celeb.name} posted new content!`;

        emitNotification(followerId, {
          message,
          postId: post._id,
          username: celeb.username,
        });

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
