const Appointment = require('../models/Appointment');
const Contact = require('../models/Contact');
const Reminder = require('../models/Reminder');
const { validationResult } = require('express-validator');
const sendEmail = require('../utils/emailService');

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Public
const createAppointment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      name,
      email,
      phone,
      scheduledDate,
      duration,
      meetingType,
      platform,
      notes,
      timezone
    } = req.body;

    // Check for scheduling conflicts
    const conflict = await Appointment.findOne({
      scheduledDate: {
        $gte: new Date(scheduledDate),
        $lt: new Date(new Date(scheduledDate).getTime() + duration * 60000)
      },
      status: { $in: ['scheduled', 'confirmed'] }
    });

    if (conflict) {
      return res.status(400).json({
        status: 'error',
        message: 'This time slot is already booked. Please select another time.'
      });
    }

    // Find or create contact
    let contact = await Contact.findOne({ email });
    if (!contact) {
      contact = new Contact({
        name,
        email,
        phone,
        city: 'Not specified',
        businessType: 'Not specified',
        industry: 'Not specified',
        stage: 'Not decided',
        message: `Appointment booking for ${meetingType}`,
        source: 'appointment_booking'
      });
      await contact.save();
    }

    // Create appointment
    const appointment = new Appointment({
      contactId: contact._id,
      name,
      email,
      phone,
      scheduledDate,
      duration,
      meetingType,
      platform,
      notes,
      timezone: timezone || 'UTC'
    });

    await appointment.save();

    // Create reminders
    const reminderTimes = [
      { type: 'email', hours: 24 }, // 24 hours before
      { type: 'email', hours: 1 }   // 1 hour before
    ];

    for (const reminder of reminderTimes) {
      const reminderDate = new Date(scheduledDate);
      reminderDate.setHours(reminderDate.getHours() - reminder.hours);

      if (reminderDate > new Date()) {
        await Reminder.create({
          appointmentId: appointment._id,
          contactId: contact._id,
          type: reminder.type,
          scheduledFor: reminderDate,
          message: `Reminder: Your ${meetingType} is scheduled for ${new Date(scheduledDate).toLocaleString()}`,
          recipient: { email, phone }
        });
      }
    }

    // Send confirmation email
    const emailData = {
      to: email,
      subject: `Appointment Confirmed - ${meetingType}`,
      html: `
        <h2>Appointment Confirmed!</h2>
        <p>Hi ${name},</p>
        <p>Your appointment has been successfully scheduled.</p>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Appointment Details:</h3>
          <p><strong>Type:</strong> ${meetingType}</p>
          <p><strong>Date & Time:</strong> ${new Date(scheduledDate).toLocaleString()}</p>
          <p><strong>Duration:</strong> ${duration} minutes</p>
          <p><strong>Platform:</strong> ${platform}</p>
          ${appointment.meetingLink ? `<p><strong>Meeting Link:</strong> <a href="${appointment.meetingLink}">Join Meeting</a></p>` : ''}
        </div>
        <p>We'll send you a reminder 24 hours and 1 hour before the meeting.</p>
        <p>If you need to reschedule, please contact us at least 24 hours in advance.</p>
        <p>Best regards,<br>Your ProDone Team</p>
      `
    };

    sendEmail(emailData).catch(err => console.error('Confirmation email error:', err));

    res.status(201).json({
      status: 'success',
      message: 'Appointment scheduled successfully!',
      data: {
        id: appointment._id,
        scheduledDate: appointment.scheduledDate,
        meetingType: appointment.meetingType
      }
    });

  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to schedule appointment'
    });
  }
};

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
const getAllAppointments = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, date, search } = req.query;

    const query = {};
    if (status) query.status = status;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.scheduledDate = { $gte: startDate, $lt: endDate };
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { meetingType: { $regex: search, $options: 'i' } }
      ];
    }

    const appointments = await Appointment.find(query)
      .populate('contactId', 'name email phone')
      .sort({ scheduledDate: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Appointment.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        appointments,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });

  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch appointments'
    });
  }
};

// @desc    Update appointment
// @route   PATCH /api/appointments/:id
// @access  Private
const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('contactId', 'name email phone');

    if (!appointment) {
      return res.status(404).json({
        status: 'error',
        message: 'Appointment not found'
      });
    }

    // If date/time changed, update reminders
    if (updateData.scheduledDate) {
      await Reminder.deleteMany({ appointmentId: id });
      
      const reminderTimes = [
        { type: 'email', hours: 24 },
        { type: 'email', hours: 1 }
      ];

      for (const reminder of reminderTimes) {
        const reminderDate = new Date(appointment.scheduledDate);
        reminderDate.setHours(reminderDate.getHours() - reminder.hours);

        if (reminderDate > new Date()) {
          await Reminder.create({
            appointmentId: appointment._id,
            contactId: appointment.contactId._id,
            type: reminder.type,
            scheduledFor: reminderDate,
            message: `Reminder: Your ${appointment.meetingType} is scheduled for ${appointment.scheduledDate.toLocaleString()}`,
            recipient: { email: appointment.email, phone: appointment.phone }
          });
        }
      }
    }

    res.status(200).json({
      status: 'success',
      message: 'Appointment updated successfully',
      data: appointment
    });

  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update appointment'
    });
  }
};

// @desc    Cancel appointment
// @route   DELETE /api/appointments/:id
// @access  Private
const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: 'cancelled' },
      { new: true }
    ).populate('contactId', 'name email phone');

    if (!appointment) {
      return res.status(404).json({
        status: 'error',
        message: 'Appointment not found'
      });
    }

    // Cancel all reminders
    await Reminder.updateMany(
      { appointmentId: id },
      { status: 'cancelled' }
    );

    // Send cancellation email
    const emailData = {
      to: appointment.email,
      subject: 'Appointment Cancelled',
      html: `
        <h2>Appointment Cancelled</h2>
        <p>Hi ${appointment.name},</p>
        <p>Your appointment scheduled for ${appointment.scheduledDate.toLocaleString()} has been cancelled.</p>
        <p>If you'd like to reschedule, please book a new appointment through our website.</p>
        <p>Best regards,<br>Your ProDone Team</p>
      `
    };

    sendEmail(emailData).catch(err => console.error('Cancellation email error:', err));

    res.status(200).json({
      status: 'success',
      message: 'Appointment cancelled successfully',
      data: appointment
    });

  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to cancel appointment'
    });
  }
};

// @desc    Get appointment statistics
// @route   GET /api/appointments/stats
// @access  Private
const getAppointmentStats = async (req, res) => {
  try {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const stats = await Appointment.aggregate([
      {
        $facet: {
          byStatus: [
            { $group: { _id: '$status', count: { $sum: 1 } } }
          ],
          byType: [
            { $group: { _id: '$meetingType', count: { $sum: 1 } } }
          ],
          today: [
            { $match: { scheduledDate: { $gte: new Date().setHours(0, 0, 0, 0) } } },
            { $count: 'count' }
          ],
          thisWeek: [
            { $match: { scheduledDate: { $gte: startOfWeek } } },
            { $count: 'count' }
          ],
          thisMonth: [
            { $match: { scheduledDate: { $gte: startOfMonth } } },
            { $count: 'count' }
          ]
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        byStatus: stats[0].byStatus,
        byType: stats[0].byType,
        today: stats[0].today[0]?.count || 0,
        thisWeek: stats[0].thisWeek[0]?.count || 0,
        thisMonth: stats[0].thisMonth[0]?.count || 0
      }
    });

  } catch (error) {
    console.error('Get appointment stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch appointment statistics'
    });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  cancelAppointment,
  getAppointmentStats
}; 