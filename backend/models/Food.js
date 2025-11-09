import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Snacks', 'Meals', 'Beverages', 'Desserts']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  emoji: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  time: {
    type: String,
    default: 'All Day'
  }
}, {
  timestamps: true
});

export default mongoose.model('Food', foodSchema);