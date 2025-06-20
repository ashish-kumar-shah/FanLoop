const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 15,
      match: /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{3,15}$/,
    },
    profilePic: {
      type: String,

      default:"https://res.cloudinary.com/dehdhj8d0/image/upload/v1750410114/fanloop-profiles/ua6r6bys9gnzvdpbmdhu.jpg"
    },
    name: {
      type: String,
      required: true,
      match: /^[A-Za-z\s]+$/,
      maxlength: 3,
      maxlength: 15,
    },
  password: {
  type: String,
  required: true,
  minlength: 8,
  validate: {
    validator: function (v) {
      const lowercase = /[a-z]/.test(v);
      const uppercase = /[A-Z]/.test(v);
      const number = /[0-9]/.test(v);
      const special = /[^a-zA-Z0-9]/.test(v);
      return lowercase && uppercase && number && special;
    },
    message:
      "Password must contain at least one lowercase, one uppercase, one number, and one special character.",
  },
},

    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, // basic valid email with domain
    },
    role: {
      type: String,
      enum: ["celebrity", "public"],
      default: "public",
    },
  },
  { timestamps: true }
);

const User = model("User", UserSchema);
module.exports = User;
