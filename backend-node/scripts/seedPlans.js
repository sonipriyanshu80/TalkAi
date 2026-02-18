const mongoose = require('mongoose');
require('dotenv').config();

const Plan = require('./src/models/Plan.model');

const plans = [
  {
    planName: 'Starter',
    monthlyPrice: 500,
    credits: 500,
    kbStorageMB: 10,
    ratePerMinTalkAi: 4,
    ratePerMinOwn: 1.5,
    features: ['10 MB KB Storage', 'Email Support'],
    isActive: true
  },
  {
    planName: 'Jump Starter',
    monthlyPrice: 2000,
    credits: 2000,
    kbStorageMB: 25,
    ratePerMinTalkAi: 4,
    ratePerMinOwn: 1.5,
    features: ['25 MB KB Storage', 'Priority Support', 'Analytics'],
    isActive: true
  },
  {
    planName: 'Growth',
    monthlyPrice: 4000,
    credits: 4000,
    kbStorageMB: 50,
    ratePerMinTalkAi: 4,
    ratePerMinOwn: 1.5,
    features: ['50 MB KB Storage', '24/7 Support', 'Advanced Analytics', 'Custom Integrations'],
    isActive: true
  },
  {
    planName: 'Enterprise',
    monthlyPrice: 0,
    credits: 0,
    kbStorageMB: 999999,
    ratePerMinTalkAi: 3,
    ratePerMinOwn: 1,
    features: ['Unlimited KB Storage', 'Dedicated Support', 'Custom Features', 'Volume Discounts'],
    isActive: true
  }
];

async function seedPlans() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Plan.deleteMany({});
    console.log('Cleared existing plans');

    await Plan.insertMany(plans);
    console.log('Plans seeded successfully!');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding plans:', error);
    process.exit(1);
  }
}

seedPlans();
