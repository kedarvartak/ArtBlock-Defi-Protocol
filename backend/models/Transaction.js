import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  artwork: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork',
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  buyerAddress: {
    type: String,
    required: true,
    lowercase: true
  },
  price: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  commission: {
    galleryShare: Number,
    artistShare: Number,
    platformFee: Number
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  }
});

export default mongoose.model('Transaction', transactionSchema); 