const Razorpay = require('razorpay');
const crypto = require('crypto');
const Company = require('../models/Company.model');
const Plan = require('../models/Plan.model');
const Transaction = require('../models/Transaction.model');

// Initialize Razorpay only if keys are available
let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
}

exports.getBalance = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const company = await Company.findById(companyId).populate('currentPlanId');
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json({
      balance: company.balance,
      currentPlan: company.currentPlanId,
      kbUsedMB: company.kbUsedMB,
      minutesUsed: company.minutesUsed,
      subscriptionStartDate: company.subscriptionStartDate,
      subscriptionEndDate: company.subscriptionEndDate,
      autoRenew: company.autoRenew
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ isActive: true }).sort({ monthlyPrice: 1 });
    
    // Move Enterprise (price 0) to end
    const sortedPlans = plans.filter(p => p.monthlyPrice > 0);
    const enterprise = plans.find(p => p.monthlyPrice === 0);
    if (enterprise) sortedPlans.push(enterprise);
    
    res.json({ plans: sortedPlans });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(503).json({ message: 'Payment service not configured' });
    }

    const { amount, type, planId } = req.body;
    const companyId = req.user.companyId;

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `${type}_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    await Transaction.create({
      companyId,
      type: type === 'topup' ? 'topup' : 'subscription',
      amount,
      balanceBefore: (await Company.findById(companyId)).balance,
      balanceAfter: (await Company.findById(companyId)).balance,
      razorpayOrderId: order.id,
      status: 'pending',
      description: type === 'topup' ? `Topup ₹${amount}` : `Plan upgrade`
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(503).json({ message: 'Payment service not configured' });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId } = req.body;
    const companyId = req.user.companyId;

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    const transaction = await Transaction.findOne({ razorpayOrderId: razorpay_order_id });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    const company = await Company.findById(companyId);
    const newBalance = company.balance + transaction.amount;

    await Company.findByIdAndUpdate(companyId, {
      balance: newBalance,
      ...(planId && {
        currentPlanId: planId,
        subscriptionStartDate: new Date(),
        subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      })
    });

    await Transaction.findByIdAndUpdate(transaction._id, {
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      balanceAfter: newBalance,
      status: 'success'
    });

    res.json({
      success: true,
      message: 'Payment verified successfully',
      newBalance
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.handleWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const signature = req.headers['x-razorpay-signature'];
    
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (signature === expectedSignature) {
      const event = req.body.event;
      
      if (event === 'payment.captured') {
        const paymentId = req.body.payload.payment.entity.id;
        const orderId = req.body.payload.payment.entity.order_id;
        
        const transaction = await Transaction.findOne({ razorpayOrderId: orderId });
        if (transaction && transaction.status === 'pending') {
          const company = await Company.findById(transaction.companyId);
          const newBalance = company.balance + transaction.amount;

          await Company.findByIdAndUpdate(transaction.companyId, {
            balance: newBalance
          });

          await Transaction.findByIdAndUpdate(transaction._id, {
            razorpayPaymentId: paymentId,
            balanceAfter: newBalance,
            status: 'success'
          });
        }
      }
    }

    res.json({ status: 'ok' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const { page = 1, limit = 20 } = req.query;

    const transactions = await Transaction.find({ 
      companyId,
      status: 'success',
      type: { $in: ['topup', 'subscription'] } // Only show billing transactions, not call deductions
    })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Transaction.countDocuments({ 
      companyId, 
      status: 'success',
      type: { $in: ['topup', 'subscription'] }
    });

    res.json({
      transactions,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
