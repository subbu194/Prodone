const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  scheduledDate: {
    type: Date,
    required: [true, 'Scheduled date is required']
  },
  duration: {
    type: Number,
    default: 30, // minutes
    enum: [15, 30, 45, 60]
  },
  meetingType: {
    type: String,
    required: [true, 'Meeting type is required'],
    enum: ['Discovery Call', 'Project Discussion', 'Technical Review', 'Follow-up']
  },
  platform: {
    type: String,
    required: [true, 'Meeting platform is required'],
    enum: ['Google Meet', 'Zoom', 'Microsoft Teams', 'Phone Call']
  },
  meetingLink: String,
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  reminderSent: {
    type: Boolean,
    default: false
  },
  reminderSentAt: Date,
  timezone: {
    type: String,
    default: 'UTC'
  }
}, {
  timestamps: true
});

// Index for better query performance
appointmentSchema.index({ scheduledDate: 1, status: 1 });
appointmentSchema.index({ contactId: 1, createdAt: -1 });
appointmentSchema.index({ email: 1, scheduledDate: 1 });

// Virtual for checking if appointment is in the past
appointmentSchema.virtual('isPast').get(function() {
  return this.scheduledDate < new Date();
});

// Virtual for checking if appointment is today
appointmentSchema.virtual('isToday').get(function() {
  const today = new Date();
  const appointmentDate = new Date(this.scheduledDate);
  return appointmentDate.toDateString() === today.toDateString();
});

module.exports = mongoose.model('Appointment', appointmentSchema); 