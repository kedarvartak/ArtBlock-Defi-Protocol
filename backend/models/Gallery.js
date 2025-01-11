import { ethers } from 'ethers';
import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  curator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coverImage: String,
  galleryAddress: {
    type: String,
    required: true,
    unique: true
  },
  transactionHash: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'suspended'],
    default: 'pending'
  },
  revenue: {
    totalEarned: {
      type: String,
      default: "0"
    },
    pendingPayout: {
      type: String,
      default: "0"
    },
    lastClaimDate: Date,
    claimHistory: [{
      amount: String,
      transactionHash: String,
      timestamp: Date
    }]
  },
  artworks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork'
  }],
  artists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  stats: {
    artworksCount: { 
      type: Number, 
      default: 0 
    },
    artistsCount: { 
      type: Number, 
      default: 0 
    },
    visitorCount: { 
      type: Number, 
      default: 0 
    },
    totalSales: {
      type: Number,
      default: 0
    },
    avgArtworkPrice: {
      type: Number,
      default: 0
    }
  },
  theme: {
    type: String,
    default: 'default'
  },
  submissionGuidelines: {
    type: String,
    default: 'Please contact the curator for submission guidelines.'
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

gallerySchema.virtual('totalRevenueETH').get(function() {
  return ethers.formatEther(this.revenue.totalEarned || "0");
});

gallerySchema.virtual('pendingRevenueETH').get(function() {
  return ethers.formatEther(this.revenue.pendingPayout || "0");
});

gallerySchema.index({ galleryAddress: 1 }, { unique: true });
gallerySchema.index({ curator: 1 });
gallerySchema.index({ status: 1 });

export default mongoose.model('Gallery', gallerySchema); 