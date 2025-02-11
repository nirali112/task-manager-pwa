const User = require('../../src/models/user');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || "SuperSecret";

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const userId = await User.create(email, password);
    res.status(201).json({ id: userId, email });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await User.validatePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: '1h',
    });

    res.status(200).json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};