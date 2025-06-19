const { Schema, model } = require("mongoose");

const NotificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // The recipient of the notification
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    message: {
      type: String,
      required: true,
    },
    fromUserId: {
      type: Schema.Types.ObjectId,
      ref: "User", // The celebrity who triggered the notification
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("Notification", NotificationSchema);
