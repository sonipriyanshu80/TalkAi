const mongoose = require('mongoose');

const twilioAccountSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyUser',
    required: true,
    index: true
  },
  accountSid: {
    type: String,
    required: true
  },
  authToken: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

twilioAccountSchema.index({ companyId: 1, isActive: 1 });

module.exports = mongoose.model('TwilioAccount', twilioAccountSchema);
