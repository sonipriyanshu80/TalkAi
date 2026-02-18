const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { validateTopup, validateUpgradePlan } = require('../validators/billing.validator');
const {
  getBalance,
  getPlans,
  createOrder,
  verifyPayment,
  handleWebhook,
  getTransactions
} = require('../controllers/billing.controller');

router.get('/balance', authMiddleware, getBalance);
router.get('/plans', authMiddleware, getPlans);
router.post('/create-order', authMiddleware, validateTopup, createOrder);
router.post('/verify-payment', authMiddleware, verifyPayment);
router.post('/webhook', handleWebhook);
router.get('/transactions', authMiddleware, getTransactions);

module.exports = router;
