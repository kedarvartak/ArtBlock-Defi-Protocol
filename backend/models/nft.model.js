const mongoose = require('mongoose');

const NFTSchema = new mongoose.Schema({
  tokenId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: String,
    required: true
  },
  ipfsHash: {
    type: String,
    required: true
  },
  artistAddress: {
    type: String,
    required: true,
    lowercase: true
  },
  galleryAddress: {
    type: String,
    required: true,
    lowercase: true
  },
  metadata: {
    type: Object,
    required: true
  },
  contractAddress: {
    type: String,
    required: true,
    lowercase: true
  },
  network: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isListed: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('NFT', NFTSchema); 