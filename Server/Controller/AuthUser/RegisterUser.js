const { validationResult } = require("express-validator");
const User = require("../../Models/User");
const { generateToken } = require("../../Utils/JWT");
const { hashPassword } = require("../../Utils/Password");

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { username, name, email, password, role } = req.body;
console.log(req.body);

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email or username already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      username,
      name,
      email,
      password: hashedPassword,
      role: role || "public",
    });

    const token = generateToken(newUser._id);

    if (process.env.NODE_ENV === "production") {
      // e.g., use secure cookies
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
    } else {
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
      });
    }

    const data = {
      name:newUser.name,
      profilePic:newUser.profilePic,
      username:newUser,
      email
    }

    res.status(201).json({
      message: "User registered successfully",
      userId: newUser._id,
      role: newUser.role,
      user:data
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Server error during registration" });
  }
};

module.exports = registerUser;
