const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send email function
const sendEmail = async (emailData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text || emailData.html.replace(/<[^>]*>/g, '') // Strip HTML for text version
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', result.messageId);
    return result;

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw error;
  }
};

// Send bulk emails
const sendBulkEmails = async (emailDataArray) => {
  try {
    const transporter = createTransporter();
    const results = [];

    for (const emailData of emailDataArray) {
      try {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: emailData.to,
          subject: emailData.subject,
          html: emailData.html,
          text: emailData.text || emailData.html.replace(/<[^>]*>/g, '')
        };

        const result = await transporter.sendMail(mailOptions);
        results.push({
          to: emailData.to,
          status: 'success',
          messageId: result.messageId
        });

      } catch (error) {
        results.push({
          to: emailData.to,
          status: 'failed',
          error: error.message
        });
      }
    }

    return results;

  } catch (error) {
    console.error('❌ Bulk email sending failed:', error);
    throw error;
  }
};

// Email templates
const emailTemplates = {
  contactConfirmation: (name, email) => ({
    subject: 'Thank you for contacting us!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #EF4444;">Thank you for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>We've received your message and will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to:</p>
        <ul>
          <li>Book a call with us: <a href="https://calendly.com/yourProDone" style="color: #EF4444;">Schedule Meeting</a></li>
          <li>Check out our portfolio: <a href="https://yourProDone.com/portfolio" style="color: #EF4444;">View Projects</a></li>
        </ul>
        <p>Best regards,<br>Your ProDone Team</p>
      </div>
    `
  }),

  appointmentConfirmation: (name, appointmentDetails) => ({
    subject: `Appointment Confirmed - ${appointmentDetails.meetingType}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #EF4444;">Appointment Confirmed!</h2>
        <p>Hi ${name},</p>
        <p>Your appointment has been successfully scheduled.</p>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #EF4444;">
          <h3>Appointment Details:</h3>
          <p><strong>Type:</strong> ${appointmentDetails.meetingType}</p>
          <p><strong>Date & Time:</strong> ${appointmentDetails.scheduledDate}</p>
          <p><strong>Duration:</strong> ${appointmentDetails.duration} minutes</p>
          <p><strong>Platform:</strong> ${appointmentDetails.platform}</p>
          ${appointmentDetails.meetingLink ? `<p><strong>Meeting Link:</strong> <a href="${appointmentDetails.meetingLink}" style="color: #EF4444;">Join Meeting</a></p>` : ''}
        </div>
        <p>We'll send you a reminder 24 hours and 1 hour before the meeting.</p>
        <p>If you need to reschedule, please contact us at least 24 hours in advance.</p>
        <p>Best regards,<br>Your ProDone Team</p>
      </div>
    `
  }),

  appointmentReminder: (name, appointmentDetails) => ({
    subject: 'Appointment Reminder',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #EF4444;">Appointment Reminder</h2>
        <p>Hi ${name},</p>
        <p>This is a reminder for your upcoming appointment:</p>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #EF4444;">
          <h3>Appointment Details:</h3>
          <p><strong>Type:</strong> ${appointmentDetails.meetingType}</p>
          <p><strong>Date & Time:</strong> ${appointmentDetails.scheduledDate}</p>
          <p><strong>Platform:</strong> ${appointmentDetails.platform}</p>
          ${appointmentDetails.meetingLink ? `<p><strong>Meeting Link:</strong> <a href="${appointmentDetails.meetingLink}" style="color: #EF4444;">Join Meeting</a></p>` : ''}
        </div>
        <p>We look forward to meeting with you!</p>
        <p>Best regards,<br>Your ProDone Team</p>
      </div>
    `
  }),

  appointmentCancellation: (name, appointmentDetails) => ({
    subject: 'Appointment Cancelled',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #EF4444;">Appointment Cancelled</h2>
        <p>Hi ${name},</p>
        <p>Your appointment scheduled for ${appointmentDetails.scheduledDate} has been cancelled.</p>
        <p>If you'd like to reschedule, please book a new appointment through our website.</p>
        <p>Best regards,<br>Your ProDone Team</p>
      </div>
    `
  })
};

module.exports = {
  sendEmail,
  sendBulkEmails,
  emailTemplates
}; 