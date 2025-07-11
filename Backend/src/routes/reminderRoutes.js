const express = require('express');
const Reminder = require('../models/Reminder');
const sendEmail = require('../utils/emailService');

const router = express.Router();

// @desc    Get all reminders
// @route   GET /api/reminders
// @access  Private
const getAllReminders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, type } = req.query;

    const query = {};
    if (status) query.status = status;
    if (type) query.type = type;

    const reminders = await Reminder.find(query)
      .populate('appointmentId', 'scheduledDate meetingType')
      .populate('contactId', 'name email phone')
      .sort({ scheduledFor: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Reminder.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        reminders,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });

  } catch (error) {
    console.error('Get reminders error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch reminders'
    });
  }
};

// @desc    Process pending reminders
// @route   POST /api/reminders/process
// @access  Private
const processReminders = async (req, res) => {
  try {
    const now = new Date();
    const pendingReminders = await Reminder.find({
      status: 'pending',
      scheduledFor: { $lte: now }
    }).populate('appointmentId contactId');

    const results = [];

    for (const reminder of pendingReminders) {
      try {
        if (reminder.type === 'email') {
          const emailData = {
            to: reminder.recipient.email,
            subject: 'Appointment Reminder',
            html: `
              <h2>Appointment Reminder</h2>
              <p>Hi ${reminder.contactId.name},</p>
              <p>This is a reminder for your upcoming appointment:</p>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>Appointment Details:</h3>
                <p><strong>Type:</strong> ${reminder.appointmentId.meetingType}</p>
                <p><strong>Date & Time:</strong> ${reminder.appointmentId.scheduledDate.toLocaleString()}</p>
              </div>
              <p>We look forward to meeting with you!</p>
              <p>Best regards,<br>Your ProDone Team</p>
            `
          };

          await sendEmail(emailData);
        }

        // Update reminder status
        reminder.status = 'sent';
        reminder.sentAt = new Date();
        await reminder.save();

        results.push({
          id: reminder._id,
          status: 'sent',
          type: reminder.type
        });

      } catch (error) {
        console.error(`Failed to process reminder ${reminder._id}:`, error);
        
        reminder.retryCount += 1;
        if (reminder.retryCount >= reminder.maxRetries) {
          reminder.status = 'failed';
          reminder.errorMessage = error.message;
        }
        await reminder.save();

        results.push({
          id: reminder._id,
          status: 'failed',
          type: reminder.type,
          error: error.message
        });
      }
    }

    res.status(200).json({
      status: 'success',
      message: `Processed ${results.length} reminders`,
      data: results
    });

  } catch (error) {
    console.error('Process reminders error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to process reminders'
    });
  }
};

// @desc    Retry failed reminders
// @route   POST /api/reminders/:id/retry
// @access  Private
const retryReminder = async (req, res) => {
  try {
    const { id } = req.params;

    const reminder = await Reminder.findById(id)
      .populate('appointmentId contactId');

    if (!reminder) {
      return res.status(404).json({
        status: 'error',
        message: 'Reminder not found'
      });
    }

    if (!reminder.canRetry) {
      return res.status(400).json({
        status: 'error',
        message: 'Reminder cannot be retried'
      });
    }

    // Reset status and retry
    reminder.status = 'pending';
    reminder.scheduledFor = new Date();
    await reminder.save();

    res.status(200).json({
      status: 'success',
      message: 'Reminder queued for retry',
      data: reminder
    });

  } catch (error) {
    console.error('Retry reminder error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retry reminder'
    });
  }
};

// @desc    Get reminder statistics
// @route   GET /api/reminders/stats
// @access  Private
const getReminderStats = async (req, res) => {
  try {
    const stats = await Reminder.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalReminders = await Reminder.countDocuments();
    const pendingReminders = await Reminder.countDocuments({
      status: 'pending',
      scheduledFor: { $lte: new Date() }
    });

    const statsObject = {
      total: totalReminders,
      overdue: pendingReminders,
      byStatus: stats.reduce((acc, stat) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {})
    };

    res.status(200).json({
      status: 'success',
      data: statsObject
    });

  } catch (error) {
    console.error('Get reminder stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch reminder statistics'
    });
  }
};

// Routes
router.get('/', getAllReminders);
router.post('/process', processReminders);
router.post('/:id/retry', retryReminder);
router.get('/stats', getReminderStats);

module.exports = router; 