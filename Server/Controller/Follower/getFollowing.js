const Follower = require('../../Models/Follower');
const User = require('../../Models/User');

const getFollowing = async (req, res) => {
  try {
    const userId = req.user; // from auth middleware (authenticated user)

    const followingList = await Follower.find({ follower: userId })
      .populate('following', 'name username profilePic role _id') // populate user info
      .lean();

    if (!followingList || followingList.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'You are not following anyone yet.',
        following: [],
      });
    }

    const followingUsers = followingList.map((entry) => entry.following);

    return res.status(200).json({
      success: true,
      message: 'Following users fetched successfully',
      following: followingUsers,
    });
  } catch (error) {
    console.error('Get Following Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching following list',
    });
  }
};

module.exports = getFollowing;
