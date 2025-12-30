import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Find user and explicitly select the password field
    const user = await Admin.findOne({ username }).select('+password');
    
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials (User not found)" });
    }

    // 2. Use bcrypt to compare the plain text with the hashed DB password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials (Wrong password)" });
    }

    // 3. Generate Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};