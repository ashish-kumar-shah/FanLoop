const User = require('../../Models/User');

const searchUser = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ success: false, message: "Search query is required" });
    }

    const regex = new RegExp(query, 'i'); // 'i' makes it case-insensitive

    const users = await User.find({
      $and: [
        {
          $or: [
            { userName: { $regex: regex } },
            { name: { $regex: regex } }
          ]
        },
        { _id: { $ne: req.user.id } } // exclude current user
      ]
    }).select("-password").limit(10); // exclude sensitive data

    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error in searchUser:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = searchUser;
