const mongoose = require('mongoose');

const phoneNumberSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyUser',
    required: true,
    index: true
  },
  twilioAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TwilioAccount',
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

phoneNumberSchema.index({ companyId: 1, isActive: 1 });

module.exports = mongoose.model('PhoneNumber', phoneNumberSchema);
