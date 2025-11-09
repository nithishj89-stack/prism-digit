import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Preparing', 'Ready', 'Delivered'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

export default mongoose.model('Order', orderSchema);