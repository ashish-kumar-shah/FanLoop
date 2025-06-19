const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  caption: {
    type: String,
    trim: true,
    maxlength: 1000,
  },
  content: [
    {
      type: {
        type: String,
        enum: ["image", "video"],
        required: true,
      },
      value: {
        type: String,
        required: true, // unique filename
      },
      url: {
        type: String,
        required: true, // /file/unique-name.ext
      },
    },
  ],
}, { timestamps: true });

module.exports = model("Post", postSchema);
