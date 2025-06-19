const User = require("../Models/User");


const checkUsernameUnique = async () => {
    const username = req.body.username;
  if (!username || typeof username !== "string") {
    return { isUnique: false, error: "Invalid or missing username" };
  }

  try {
    const user = await User.findOne({ username });
    return { isUnique: !user };
  } catch (error) {
    console.error("Error checking username uniqueness:", error);
    return { isUnique: false, error: "Internal server error" };
  }
};


const generateUniqueUsername = async (base = "user") => {
  let username;
  let isUnique = false;
  let attempts = 0;

  while (!isUnique && attempts < 10) {
    const randomNum = Math.floor(1000 + Math.random() * 9000); // e.g., user1234
    username = `${base}${randomNum}`;
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      isUnique = true;
    }
    attempts++;
  }

  return username;
};

module.exports = {
  checkUsernameUnique,
  generateUniqueUsername,
};
