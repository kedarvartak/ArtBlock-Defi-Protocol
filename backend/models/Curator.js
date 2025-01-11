import mongoose from 'mongoose';

const curatorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  role: {
    type: String,
    default: 'curator',
    immutable: true
  },
  contract: {
    network: {
      type: String,
      default: 'sepolia'
    },
    galleries: [{
      address: String,
      name: String,
      status: String,
      createdAt: Date
    }],
    totalRevenue: {
      type: String,
      default: "0"
    },
    pendingRevenue: {
      type: String,
      default: "0"
    }
  },
  profile: {
    displayName: String,
    bio: String,
    avatar: String,
    socialLinks: {
      twitter: String,
      instagram: String,
      website: String
    },
    galleriesCount: {
      type: Number,
      default: 0
    }
  },
  analytics: {
    totalArtistsCurated: {
      type: Number,
      default: 0
    },
    totalArtworksSold: {
      type: Number,
      default: 0
    },
    totalVisitors: {
      type: Number,
      default: 0
    }
  }
}, { timestamps: true });

export default mongoose.model('Curator', curatorSchema); 