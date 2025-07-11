const express = require('express');
const { body } = require('express-validator');
const {
  submitContact,
  getAllContacts,
  updateContactStatus,
  getContactStats
} = require('../controllers/contactController');

const router = express.Router();

// Validation middleware
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email address'),
  body('phone')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please enter a valid phone number'),
  body('city')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('City must be between 2 and 50 characters'),
  body('businessType')
    .isIn(['B2B', 'B2C', 'Both'])
    .withMessage('Please select a valid business type'),
  body('industry')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Industry must be between 2 and 100 characters'),
  body('stage')
    .isIn(['Not decided', 'Started', 'Ready to build'])
    .withMessage('Please select a valid business stage'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
];

// Routes
router.post('/', contactValidation, submitContact);
router.get('/', getAllContacts);
router.patch('/:id', updateContactStatus);
router.get('/stats', getContactStats);

module.exports = router; 