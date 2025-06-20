const User = require('../../Models/User');
const { generateUniqueUsername } = require('../../Auth/ValidateUserName');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
const jwt = require('jsonwebtoken');

const dummyAccount = async (req, res) => {
  try {
    // Generate full name between 3-15 characters and alphabet only
    let name;
    do {
      name = faker.person.fullName().split(' ').slice(0, 2).join(' ');
    } while (name.length < 3 || name.length > 15 || !/^[A-Za-z\s]+$/.test(name));

    // Generate a valid username using custom method (assumed safe)
    const username = await generateUniqueUsername('user');

    // Generate unique, valid email
    let email, existingEmail;
    do {
      const [first, last] = name.split(' ');
      email = faker.internet.email({ firstName: first, lastName: last }).toLowerCase();
      existingEmail = await User.findOne({ email });
    } while (existingEmail);

    // Generate valid password (min 8 chars + uppercase, lowercase, number, special char)
    let rawPassword;
    do {
      rawPassword = faker.internet.password({ length: 10, memorable: false });
    } while (
      !/[a-z]/.test(rawPassword) ||
      !/[A-Z]/.test(rawPassword) ||
      !/[0-9]/.test(rawPassword) ||
      !/[^a-zA-Z0-9]/.test(rawPassword)
    );

    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
      role: 'public',
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '7d' }
    );

    res
      .status(201)
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        token,
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
