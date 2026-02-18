const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
    enum: ['Free', 'Starter', 'Jump Starter', 'Growth', 'Enterprise']
  },
  monthlyPrice: {
    type: Number,
    required: true
  },
  credits: {
    type: Number,
    required: true
  },
  kbStorageMB: {
    type: Number,
    required: true
  },
  ratePerMinTalkAi: {
    type: Number,
    default: 4
  },
  ratePerMinOwn: {
    type: Number,
    default: 1.5
  },
  features: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);
