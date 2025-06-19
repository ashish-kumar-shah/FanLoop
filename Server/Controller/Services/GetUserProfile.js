const User = require('../../Models/User');
const Post = require('../../Models/Post');
const Follower = require('../../Models/Follower');

const getUserProfile = async (req, res) => {
  try {
    const username = req.params.username;

    if (!username) {
      return res.status(400).json({ success: false, message: 'Username is required' });
    }

    // Find user
    const user = await User.findOne({ username }).select('-password -email');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Get user's posts
    const posts = await Post.find({ user: user._id });

    // Get follower and following count
    const followerCount = await Follower.countDocuments({ following: user._id });
    const followingCount = await Follower.countDocuments({ follower: user._id });

    return res.status(200).json({
      success: true,
      user,
      stats: {
        followers: followerCount,
        following: followingCount,
      },
      posts,
    });

  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports = { getUserProfile };
