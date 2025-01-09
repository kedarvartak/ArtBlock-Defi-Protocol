import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
    default: 'artist'
  },
  // Add contract details
  contract: {
    address: {
      type: String,
      unique: true,
      sparse: true
    },
    deploymentDate: {
      type: Date
    },
    network: {
      type: String,
      default: 'sepolia'
    },
    totalMinted: {
      type: Number,
      default: 0
    },
    transactionHash: String,
    blockExplorerUrl: String,
    transactionId: String,
    deploymentStatus: {
      type: String,
      enum: ['pending', 'deployed', 'failed'],
      default: 'pending'
    }
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  // Artist Profile Data
  profile: {
    displayName: {
      type: String,
      trim: true
    },
    followersCount: {
      type: Number,
      default: 0
    },
    artworksCount: {
      type: Number,
      default: 0
    },
    followingCount: {
      type: Number,
      default: 0
    },
    salesCount: {
      type: Number,
      default: 0
    }
  },
  // Analytics Data
  analytics: {
    totalArtworksListed: {
      type: Number,
      default: 0
    },
    totalSalesValue: {
      type: Number,
      default: 0
    },
    averagePrice: {
      type: Number,
      default: 0
    },
    totalViews: {
      type: Number,
      default: 0
    },
    totalLikes: {
      type: Number,
      default: 0
    }
  },
  // Distribution Settings
  distributionSettings: {
    galleryShare: {
      type: Number,
      default: 10 // Default 10%
    },
    artistShare: {
      type: Number,
      default: 85 // Default 85%
    },
    platformFee: {
      type: Number,
      default: 5 // Default 5%
    }
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);