const Post = require('../../Models/Post');
const User = require('../../Models/User');

const getUserPost = async (req, res) => {
  try {
    console.log('Query params:', req.query);
    
    // Get username from query parameters, not params
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ success: false, message: 'Username is required' });
    }

    // Find user document by username
    const user = await User.findOne({ userName: username });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Fetch all posts created by the user id
    const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    console.error("Error fetching user's posts:", error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

module.exports = getUserPost;
