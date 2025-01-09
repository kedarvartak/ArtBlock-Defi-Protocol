import express from 'express';
import User from '../models/User.js';
import Artwork from '../models/Artwork.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get dashboard data
router.get('/dashboard/:userId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    console.log('User data from DB:', user); // Debug log

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the requesting user matches the user ID
    if (req.user.id !== req.params.userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    // Get user's artworks
    const artworks = await Artwork.find({ artist: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(8);

    // Explicitly structure the distribution settings
    const distributionSettings = {
      artistShare: user.distributionSettings?.artistShare || 85,
      galleryShare: user.distributionSettings?.galleryShare || 10,
      platformFee: user.distributionSettings?.platformFee || 5
    };

    console.log('Distribution Settings:', distributionSettings); // Debug log

    const dashboardData = {
      profile: {
        displayName: user.username,
        followersCount: user.profile?.followersCount || 0,
        artworksCount: user.profile?.artworksCount || 0,
        followingCount: user.profile?.followingCount || 0,
        salesCount: user.profile?.salesCount || 0,
        role: user.role,
        badges: ['🎨', '⭐', '🏆']
      },
      analytics: {
        totalArtworksListed: artworks.length,
        totalSalesValue: user.analytics?.totalSalesValue || 0,
        averagePrice: user.analytics?.averagePrice || 0,
        totalViews: user.analytics?.totalViews || 0,
        totalLikes: user.analytics?.totalLikes || 0
      },
      distributionSettings,
      artworks: artworks.map(artwork => ({
        _id: artwork._id,
        title: artwork.title,
        price: artwork.price,
        ipfsHash: artwork.ipfsHash,
        status: artwork.status,
        analytics: {
          views: artwork.views || 0,
          likes: artwork.likes || 0
        }
      }))
    };

    console.log('Final dashboard data:', dashboardData); // Debug log
    res.json(dashboardData);
  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router; 