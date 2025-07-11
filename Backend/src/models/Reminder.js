const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true
  },
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true
  },
  type: {
    type: String,
    enum: ['email', 'sms', 'push'],
    required: true
  },
  scheduledFor: {
    type: Date,
    required: true
  },
  sentAt: Date,
  status: {
    type: String,
    enum: ['pending', 'sent', 'failed', 'cancelled'],
    default: 'pending'
  },
  message: {
    type: String,
    required: true
  },
  recipient: {
    email: String,
    phone: String
  },
  retryCount: {
    type: Number,
    default: 0
  },
  maxRetries: {
    type: Number,
    default: 3
  },
  errorMessage: String,
  metadata: {
    type: Map,
    of: String
  }
}, {
  timestamps: true
});

// Index for better query performance
reminderSchema.index({ scheduledFor: 1, status: 1 });
reminderSchema.index({ appointmentId: 1, type: 1 });
reminderSchema.index({ status: 'pending', scheduledFor: 1 });

// Virtual for checking if reminder is overdue
reminderSchema.virtual('isOverdue').get(function() {
  return this.scheduledFor < new Date() && this.status === 'pending';
});

// Virtual for checking if reminder can be retried
reminderSchema.virtual('canRetry').get(function() {
  return this.status === 'failed' && this.retryCount < this.maxRetries;
});

module.exports = mongoose.model('Reminder', reminderSchema); 