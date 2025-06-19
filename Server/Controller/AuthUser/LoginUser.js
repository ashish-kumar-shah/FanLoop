
const { validationResult } = require("express-validator");
const User = require("../../Models/User");
const { verifyPassword } = require("../../Utils/Password");
const { generateToken } = require("../../Utils/JWT");

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = generateToken(user._id);

    if (process.env.NODE_ENV === "production") {
      // e.g., use secure cookies
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });
    } else {
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });
    }


    const data = {
      name:user.name,
      email:user.email,
      profilePic:user.profilePic,
      username:user.username,

    }

    res.json({
      message: "Login successful",
      userId: user._id,
      role: user.role,
      user:data
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
};

module.exports = loginUser;
