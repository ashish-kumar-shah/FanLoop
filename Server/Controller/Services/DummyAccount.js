const User = require('../../Models/User');
const { generateUniqueUsername } = require('../../Auth/ValidateUserName');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
const jwt = require('jsonwebtoken');

const dummyAccount = async (req, res) => {
  try {
    const name = faker.person.fullName();
    const username = await generateUniqueUsername('user');

    let email, existingEmail;
    do {
      const [first, last] = name.split(' ');
      email = faker.internet.email({ firstName: first, lastName: last }).toLowerCase();
      existingEmail = await User.findOne({ email });
    } while (existingEmail);

    const rawPassword = faker.internet.password({ length: 10 });
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
      role: 'public',
    });

    await newUser.save();

    // Generate JWT Token
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '7d' }
    );

    // Send token via HTTP response (as JSON or set-cookie)
    res
      .status(201)
      // optional: send as cookie
      .cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000 })
      .json({
        success: true,
        token, // <-- token in response
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          username: newUser.username,
          role: newUser.role,
          profilePic: newUser.profilePic,
        },
      });
  } catch (error) {
    console.error('Error creating dummy account:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

module.exports = dummyAccount;
