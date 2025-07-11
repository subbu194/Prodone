# Digital ProDone Backend API

A robust Express.js backend for the Digital ProDone website with MongoDB integration, featuring contact management, appointment scheduling, and automated reminders.

## 🚀 Features

- **Contact Management**: Handle contact form submissions with validation
- **Appointment Scheduling**: Book and manage client meetings
- **Automated Reminders**: Email notifications for upcoming appointments
- **Email Service**: Automated email sending with templates
- **Data Validation**: Comprehensive input validation
- **Error Handling**: Robust error handling and logging
- **Security**: Helmet, CORS, and input sanitization

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Gmail account for email service

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `config.env` and update with your values:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/digital_ProDone
   JWT_SECRET=your_jwt_secret_key_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📚 API Documentation

### Contact Endpoints

#### POST `/api/contact`
Submit a contact form
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "city": "New York",
  "businessType": "B2B",
  "industry": "Technology",
  "stage": "Ready to build",
  "message": "I need help with my startup"
}
```

#### GET `/api/contact`
Get all contacts (with pagination)
```
Query params: page, limit, status, search
```

#### PATCH `/api/contact/:id`
Update contact status
```json
{
  "status": "contacted",
  "notes": "Follow up scheduled"
}
```

#### GET `/api/contact/stats`
Get contact statistics

### Appointment Endpoints

#### POST `/api/appointments`
Create a new appointment
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "scheduledDate": "2024-01-15T10:00:00Z",
  "duration": 30,
  "meetingType": "Discovery Call",
  "platform": "Google Meet",
  "notes": "Initial consultation"
}
```

#### GET `/api/appointments`
Get all appointments (with pagination)
```
Query params: page, limit, status, date, search
```

#### PATCH `/api/appointments/:id`
Update appointment details

#### DELETE `/api/appointments/:id`
Cancel an appointment

#### GET `/api/appointments/stats`
Get appointment statistics

### Reminder Endpoints

#### GET `/api/reminders`
Get all reminders (with pagination)

#### POST `/api/reminders/process`
Process pending reminders (automated)

#### POST `/api/reminders/:id/retry`
Retry a failed reminder

#### GET `/api/reminders/stats`
Get reminder statistics

## 🗄️ Database Models

### Contact
- Personal information (name, email, phone)
- Business details (type, industry, stage)
- Status tracking and notes
- Timestamps and metadata

### Appointment
- Meeting details (date, duration, type)
- Platform and meeting link
- Status tracking
- Associated contact

### Reminder
- Scheduled notification times
- Email/SMS configuration
- Retry logic and error handling
- Status tracking

## 🔧 Configuration

### Email Service
The backend uses Gmail SMTP for sending emails. To set up:

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password
3. Update `EMAIL_USER` and `EMAIL_PASS` in config.env

### MongoDB
- Local: `mongodb://localhost:27017/digital_ProDone`
- Cloud: Use MongoDB Atlas connection string

## 🚀 Deployment

### Environment Variables
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `EMAIL_USER`: Gmail address
- `EMAIL_PASS`: Gmail app password
- `NODE_ENV`: Environment (development/production)

### Production Setup
1. Set `NODE_ENV=production`
2. Use environment variables for sensitive data
3. Set up MongoDB Atlas or production database
4. Configure email service
5. Set up SSL/TLS certificates

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Input Validation**: Express-validator
- **Rate Limiting**: Built-in protection
- **Data Sanitization**: XSS protection

## 📊 Monitoring

### Health Check
```
GET /api/health
```

### Logging
- Morgan for HTTP request logging
- Console logging for errors and events
- Structured logging for debugging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact: your-email@domain.com 