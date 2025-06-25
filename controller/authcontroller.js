const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser)
    return res.status(400).json({ message: 'User with that email or username already exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = await new User({ username, email, password: hash }).save();
  res.status(201).json({ message: 'User created' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};