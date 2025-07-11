const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');
const sendEmail = require('../utils/emailService');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    // Check for validation errors
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
      city,
      businessType,
      industry,
      stage,
      message
    } = req.body;

    // Check if contact already exists with same email in last 24 hours
    const existingContact = await Contact.findOne({
      email,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    if (existingContact) {
      return res.status(400).json({
        status: 'error',
        message: 'You have already submitted a contact form in the last 24 hours'
      });
    }

    // Create new contact
    const contact = new Contact({
      name,
      email,
      phone,
      city,
      businessType,
      industry,
      stage,
      message,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await contact.save();

    // Send notification email to admin
    const adminEmailData = {
      to: process.env.EMAIL_USER,
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Business Type:</strong> ${businessType}</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Stage:</strong> ${stage}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      `
    };

    // Send auto-reply to customer
    const customerEmailData = {
      to: email,
      subject: 'Thank you for contacting us!',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>We've received your message and will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to:</p>
        <ul>
          <li>Book a call with us: <a href="https://calendly.com/yourProDone">Schedule Meeting</a></li>
          <li>Check out our portfolio: <a href="https://yourProDone.com/portfolio">View Projects</a></li>
        </ul>
        <p>Best regards,<br>Your ProDone Team</p>
      `
    };

    // Send emails (non-blocking)
    Promise.all([
      sendEmail(adminEmailData),
      sendEmail(customerEmailData)
    ]).catch(err => console.error('Email sending error:', err));

    res.status(201).json({
      status: 'success',
      message: 'Contact form submitted successfully! We\'ll get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email
      }
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to submit contact form'
    });
  }
};

// @desc    Get all contacts (admin only)
// @route   GET /api/contact
// @access  Private
const getAllContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;

    const query = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } }
      ];
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Contact.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        contacts,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch contacts'
    });
  }
};

// @desc    Update contact status
// @route   PATCH /api/contact/:id
// @access  Private
const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status, notes },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Contact status updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update contact'
    });
  }
};

// @desc    Get contact statistics
// @route   GET /api/contact/stats
// @access  Private
const getContactStats = async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalContacts = await Contact.countDocuments();
    const todayContacts = await Contact.countDocuments({
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) }
    });

    const statsObject = {
      total: totalContacts,
      today: todayContacts,
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
    console.error('Get stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch statistics'
    });
  }
};

module.exports = {
  submitContact,
  getAllContacts,
  updateContactStatus,
  getContactStats
}; 