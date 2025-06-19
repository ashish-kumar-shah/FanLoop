const mongoose = require('mongoose');
const Post = require('../../Models/Post');

const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    // Validate ObjectId format
    if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ error: 'Invalid or missing Post ID' });
    }

    // No need to convert, just use directly
    const post = await Post.findById(postId).populate('user', 'username profilePic');

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.status(200).json({ post });
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = getPostById;
