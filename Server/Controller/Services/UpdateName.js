const User = require('../../Models/User');

const updateName = async (req, res) => {
  try {
    const userId = req.user;
    const { name } = req.body;

    if (!name || name.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Name must be at least 2 characters.' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { name: name.trim() },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Name updated successfully',
      name: user.name,
    });

  } catch (error) {
    console.error("Error updating name:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = updateName;
