const Follower = require('../../Models/Follower');
const User = require('../../Models/User');

const createFollower = async (req, res) => {
  try {
    const followerId = req.user; // ID from auth middleware
    const { following } = req.body;

    if (!following) {
      return res.status(400).json({ success: false, message: 'Following user ID is required' });
    }

    const followerUser = await User.findById(followerId);
    const followingUser = await User.findById(following);

    if (!followerUser) {
      return res.status(404).json({ success: false, message: 'Follower user not found' });
    }

    if (!followingUser) {
      return res.status(404).json({ success: false, message: 'User to follow not found' });
    }

    if (followerId === following) {
      return res.status(400).json({ success: false, message: 'You cannot follow yourself' });
    }

    // ❌ If follower is public and following is also public → deny
    if (followerUser.role === 'public' && followingUser.role === 'public') {
      return res.status(403).json({ success: false, message: 'Public users can only follow celebrities' });
    }

    const alreadyFollowing = await Follower.findOne({ follower: followerId, following });
    if (alreadyFollowing) {
      return res.status(409).json({ success: false, message: 'Already following this user' });
    }

    await Follower.create({ follower: followerId, following });

    return res.status(200).json({ success: true, message: 'Followed successfully' });
  } catch (error) {
    console.error('Follow error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = createFollower;
