const { Schema, model } = require('mongoose');

const followerSchema = new Schema(
  {
    follower: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    following: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        validator: function (value) {
          // Prevent self-following
          return value.toString() !== this.follower.toString();
        },
        message: 'A user cannot follow themselves.',
      },
    },
  },
  { timestamps: true }
);

// Compound index to prevent duplicate follower-following pairs
followerSchema.index({ follower: 1, following: 1 }, { unique: true });

const Follower = model('followers', followerSchema);
module.exports = Follower;
