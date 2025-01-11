import User from '../models/User.js';
import Curator from '../models/Curator.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (userData) => {
  try {
    const { username, password, walletAddress, role } = userData;

    // Check if user exists in either collection
    const existingUser = await Promise.all([
      User.findOne({ $or: [{ username }, { walletAddress }] }),
      Curator.findOne({ $or: [{ username }, { walletAddress }] })
    ]);

    if (existingUser[0] || existingUser[1]) {
      throw new Error('Username or wallet address already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let user;
    if (role === 'curator') {
      // Create curator using Curator model
      user = new Curator({
        username,
        password: hashedPassword,
        walletAddress: walletAddress.toLowerCase(),
        profile: {
          displayName: username,
          followersCount: 0,
          galleriesCount: 0,
          followingCount: 0,
          curatedArtworks: 0
        },
        analytics: {
          totalGalleries: 0,
          totalArtistsCurated: 0,
          totalVisitors: 0,
          totalRevenue: 0,
          mostPopularGallery: 'N/A',
          topArtist: 'N/A',
          avgVisitDuration: 15
        },
        contract: {
          network: 'sepolia',
          totalMinted: 0,
          deploymentStatus: 'pending'
        }
      });
    } else {
      // Create artist using User model
      user = new User({
        username,
        password: hashedPassword,
        walletAddress: walletAddress.toLowerCase(),
        role: 'artist',
        profile: {
          displayName: username,
          followersCount: 0,
          artworksCount: 0,
          followingCount: 0,
          salesCount: 0
        },
        analytics: {
          totalArtworksListed: 0,
          totalSalesValue: 0,
          averagePrice: 0,
          totalViews: 0,
          totalLikes: 0
        }
      });
    }

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
    console.error('Registration error:', error);
    throw error;
  }
};

export const loginUser = async ({ password, walletAddress }) => {
  try {
    // Check both collections for the user
    const user = await User.findOne({ walletAddress }) || 
                await Curator.findOne({ walletAddress });
    
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