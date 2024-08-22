const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Secret key for JWT
const jwtSecret = "SuperSecret"; // Replace with your actual secret key

// Register a new user
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Create a new user
    const userId = await User.create(email, password);

    res.status(201).json({ id: userId, email });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login an existing user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Validate the password
    const isMatch = await User.validatePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: '1h',
    })

    res.status(200).json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
