import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  artists: [{
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    joinDate: {
      type: Date,
      default: Date.now
    }
  }]
});

export default mongoose.model('Gallery', gallerySchema); 