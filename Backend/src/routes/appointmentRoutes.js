const express = require('express');
const { body } = require('express-validator');
const {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  cancelAppointment,
  getAppointmentStats
} = require('../controllers/appointmentController');

const router = express.Router();

// Validation middleware
const appointmentValidation = [
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
  body('scheduledDate')
    .isISO8601()
    .withMessage('Please enter a valid date and time'),
  body('duration')
    .isInt({ min: 15, max: 120 })
    .withMessage('Duration must be between 15 and 120 minutes'),
  body('meetingType')
    .isIn(['Discovery Call', 'Project Discussion', 'Technical Review', 'Follow-up'])
    .withMessage('Please select a valid meeting type'),
  body('platform')
    .isIn(['Google Meet', 'Zoom', 'Microsoft Teams', 'Phone Call'])
    .withMessage('Please select a valid platform'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters'),
  body('timezone')
    .optional()
    .isString()
    .withMessage('Please enter a valid timezone')
];

// Routes
router.post('/', appointmentValidation, createAppointment);
router.get('/', getAllAppointments);
router.patch('/:id', updateAppointment);
router.delete('/:id', cancelAppointment);
router.get('/stats', getAppointmentStats);

module.exports = router; 