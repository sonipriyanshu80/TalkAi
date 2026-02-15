const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { validateImportTwilio } = require('../validators/phone.validator');
const { 
  importTwilio, 
  getPhoneNumbers, 
  activateNumber,
  deactivateNumber, 
  deleteNumber,
  deleteTwilioAccount 
} = require('../controllers/phone.controller');

router.post('/import-twilio', authMiddleware, validateImportTwilio, importTwilio);
router.get('/', authMiddleware, getPhoneNumbers);
router.patch('/:id/activate', authMiddleware, activateNumber);
router.patch('/:id/deactivate', authMiddleware, deactivateNumber);
router.delete('/:id', authMiddleware, deleteNumber);
router.delete('/twilio/account', authMiddleware, deleteTwilioAccount);

module.exports = router;
