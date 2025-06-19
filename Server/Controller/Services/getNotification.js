const Notification = require('../../Models/Notification');

const getNotifications = async (req, res) => {
  try {
    const userId = req.user;

    const notifications = await Notification.find({ userId, isRead: false }) // filter unread only
      .sort({ createdAt: -1 })
      .populate('fromUserId', 'name username profilePic')
      .populate('postId', 'content caption');

    res.status(200).json({ success: true, notifications });
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ success: false, error: "Failed to get notifications" });
  }
};




const markSingleNotificationAsSeen = async (req, res) => {
  try {
    const userId = req.user;
    const { notificationId } = req.body;

    const updated = await Notification.findOneAndUpdate(
      { _id: notificationId, userId },  // ensure the user owns the notification
      { $set: { isRead: true } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, error: "Notification not found or unauthorized" });
    }

    res.status(200).json({ success: true, message: "Notification marked as seen" });
  } catch (err) {
    console.error("Error marking notification as seen:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = {markSingleNotificationAsSeen,getNotifications};