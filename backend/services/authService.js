import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (userData) => {
  try {
    const { username, password, walletAddress } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ username }, { walletAddress }] 
    });
    
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      username,
      password: hashedPassword,
      walletAddress,
      role: 'artist',
      profile: {
        displayName: username // Default to username
      }
    });

    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        walletAddress: user.walletAddress,
        role: user.role,
        profile: user.profile
      }
    };
  } catch (error) {
    throw error;
  }
};

export const loginUser = async ({ password, walletAddress }) => {
  try {
    // Find user by wallet address
    const user = await User.findOne({ walletAddress });
    
    if (!user) {
      throw new Error('User not found');
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        walletAddress: user.walletAddress,
        role: user.role,
        profile: user.profile
      }
    };
  } catch (error) {
    throw error;
  }
}; 