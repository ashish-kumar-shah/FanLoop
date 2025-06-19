const User = require('../../Models/User');

const updateEmail = async (req, res) => {
  try {
    const userId = req.user;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format.' });
    }

    // Check if email is taken by someone else
    const existing = await User.findOne({ email, _id: { $ne: userId } });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already in use.' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { email },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Email updated successfully',
      email: user.email,
    });

  } catch (error) {
    console.error("Error updating email:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = updateEmail;
