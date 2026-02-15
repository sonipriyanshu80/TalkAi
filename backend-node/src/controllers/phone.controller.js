const TwilioAccount = require('../models/TwilioAccount.model');
const PhoneNumber = require('../models/PhoneNumber.model');
const { encrypt, decrypt } = require('../services/encryption.service');
const twilio = require('twilio');

exports.importTwilio = async (req, res) => {
  try {
    const { accountSid, authToken } = req.body;
    const companyId = req.user.companyId;

    // Validate credentials by fetching numbers from Twilio
    const client = twilio(accountSid, authToken);
    let twilioNumbers;
    
    try {
      twilioNumbers = await client.incomingPhoneNumbers.list({ limit: 50 });
    } catch (error) {
      return res.status(400).json({ message: 'Invalid Twilio credentials' });
    }

    if (twilioNumbers.length === 0) {
      return res.status(400).json({ message: 'No phone numbers found in this Twilio account' });
    }

    // Check if account already exists
    let twilioAccount = await TwilioAccount.findOne({ companyId });
    
    if (twilioAccount) {
      // Update existing
      twilioAccount.accountSid = encrypt(accountSid);
      twilioAccount.authToken = encrypt(authToken);
      await twilioAccount.save();
    } else {
      // Create new
      twilioAccount = await TwilioAccount.create({
        companyId,
        accountSid: encrypt(accountSid),
        authToken: encrypt(authToken),
        isActive: true
      });
    }

    // Delete old phone numbers for this company
    await PhoneNumber.deleteMany({ companyId });

    // Import phone numbers
    const phoneNumbers = twilioNumbers.map((num, index) => ({
      companyId,
      twilioAccountId: twilioAccount._id,
      phoneNumber: num.phoneNumber,
      isActive: index === 0
    }));

    await PhoneNumber.insertMany(phoneNumbers);

    res.json({ 
      message: 'Twilio account imported successfully',
      count: phoneNumbers.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPhoneNumbers = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const phoneNumbers = await PhoneNumber.find({ companyId, isDeleted: false }).sort({ createdAt: -1 });
    
    res.json({ phoneNumbers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.activateNumber = async (req, res) => {
  try {
    const { id } = req.params;
    const companyId = req.user.companyId;

    // Deactivate all numbers for this company
    await PhoneNumber.updateMany({ companyId }, { isActive: false });

    // Activate selected number
    const phoneNumber = await PhoneNumber.findOneAndUpdate(
      { _id: id, companyId },
      { isActive: true },
      { new: true }
    );

    if (!phoneNumber) {
      return res.status(404).json({ message: 'Phone number not found' });
    }

    res.json({ message: 'Phone number activated', phoneNumber });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deactivateNumber = async (req, res) => {
  try {
    const { id } = req.params;
    const companyId = req.user.companyId;

    const phoneNumber = await PhoneNumber.findOneAndUpdate(
      { _id: id, companyId },
      { isActive: false },
      { new: true }
    );

    if (!phoneNumber) {
      return res.status(404).json({ message: 'Phone number not found' });
    }

    res.json({ message: 'Phone number deactivated', phoneNumber });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteNumber = async (req, res) => {
  try {
    const { id } = req.params;
    const companyId = req.user.companyId;

    const phoneNumber = await PhoneNumber.findOneAndUpdate(
      { _id: id, companyId },
      { isDeleted: true, isActive: false },
      { new: true }
    );

    if (!phoneNumber) {
      return res.status(404).json({ message: 'Phone number not found' });
    }

    // If deleted number was active, activate first remaining number
    const firstNumber = await PhoneNumber.findOne({ companyId, isDeleted: false });
    if (firstNumber) {
      firstNumber.isActive = true;
      await firstNumber.save();
    }

    res.json({ message: 'Phone number deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTwilioAccount = async (req, res) => {
  try {
    const companyId = req.user.companyId;

    await TwilioAccount.deleteMany({ companyId });
    await PhoneNumber.deleteMany({ companyId });

    res.json({ message: 'Twilio account and all phone numbers deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
