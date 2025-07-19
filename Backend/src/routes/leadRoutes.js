const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/leads', express.json(), async (req, res) => {
  const { industry, businessType, name, city, phone, email, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: `ProDone Website <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: 'New Lead Magnet Submission',
      html: `
        <h2>New Lead Magnet Submission</h2>
        <p><b>Industry:</b> ${industry}</p>
        <p><b>Business Type:</b> ${businessType}</p>
        <p><b>Name:</b> ${name}</p>
        <p><b>City:</b> ${city}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Project Description:</b> ${message}</p>
      `
    };
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error('Lead email error:', err);
    res.status(500).json({ error: 'Failed to send lead email' });
  }
});

module.exports = router; 