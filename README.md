# 🚀 Digital ProDone Full-Stack Website

A complete, modern digital ProDone website built with React frontend, Express backend, and MongoDB database. Features stunning animations, interactive components, and full business functionality.

![Digital ProDone Website](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Express](https://img.shields.io/badge/Express-4.18.2-green?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-7.5.0-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.2.7-blue?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 Frontend (React)
- **Modern Design**: Red (#EF4444) primary color with dark theme
- **Responsive Layout**: Mobile-first design for all devices
- **Smooth Animations**: Framer Motion animations and micro-interactions
- **Interactive Components**: Live chat, floating contact, appointment booking
- **Form Validation**: Comprehensive validation with React Hook Form
- **SEO Optimized**: Meta tags, structured data, performance optimized
- **Accessibility**: WCAG compliant with keyboard navigation

### 🔧 Backend (Express)
- **Contact Management**: Handle form submissions with validation
- **Appointment Scheduling**: Book and manage client meetings
- **Automated Reminders**: Email notifications for appointments
- **Email Service**: Automated email sending with templates
- **Data Validation**: Comprehensive input validation
- **Security**: Helmet, CORS, input sanitization

### 🗄️ Database (MongoDB)
- **Contact Model**: Store client information and form submissions
- **Appointment Model**: Manage meeting bookings and scheduling
- **Reminder Model**: Handle automated notifications
- **Indexing**: Optimized queries for performance
- **Relationships**: Proper data relationships and references

## 🏗️ Project Structure

```
digital-ProDone/
├── Frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── App.js          # Main app component
│   │   ├── index.js        # React entry point
│   │   └── index.css       # Global styles
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   └── README.md          # Frontend documentation
├── Backend/                 # Express backend API
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   └── server.js       # Express server
│   ├── package.json        # Backend dependencies
│   └── README.md          # Backend documentation
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd digital-ProDone
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create `config.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/digital_ProDone
JWT_SECRET=your_jwt_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
NODE_ENV=development
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd Frontend
npm install
```

Start the frontend:
```bash
npm start
```

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/api/health

## 🎯 Key Features

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions
- Cross-browser compatibility

### 🎨 Modern UI/UX
- Dark theme with red accents
- Smooth animations and transitions
- Interactive hover effects
- Loading states and feedback

### 📊 Business Functionality
- Contact form with validation
- Appointment booking system
- Automated email notifications
- Client management
- Project portfolio showcase

### 🔒 Security & Performance
- Input validation and sanitization
- CORS protection
- Rate limiting
- Optimized database queries
- Compressed assets

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **React Hook Form** - Form handling
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Nodemailer** - Email service
- **Express Validator** - Validation
- **Helmet** - Security

### Development
- **Node.js** - Runtime
- **npm** - Package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📱 Pages & Components

### Main Sections
1. **Hero Section** - Animated background with CTA
2. **About** - Company information and values
3. **Services** - Service offerings with details
4. **Portfolio** - Project showcase with modals
5. **Testimonials** - Client feedback carousel
6. **Contact** - Contact form and appointment booking

### Interactive Elements
- **Navbar** - Sticky navigation with dark mode toggle
- **Floating Contact** - Quick access contact button
- **Live Chat** - Interactive chat widget
- **Appointment Modal** - Meeting booking interface
- **Portfolio Modal** - Project details viewer

## 🔧 Configuration

### Environment Variables
```env
# Backend
PORT=5000
MONGODB_URI=mongodb://localhost:27017/digital_ProDone
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
NODE_ENV=development

# Frontend
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ProDone_NAME=Your ProDone Name
```

### Customization
- Update company information in components
- Modify colors in `tailwind.config.js`
- Add/remove services in `Services.js`
- Update portfolio projects in `Portfolio.js`
- Customize email templates in backend

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or production database
2. Configure environment variables
3. Deploy to Heroku, Railway, or similar
4. Set up email service (Gmail, SendGrid)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to Netlify, Vercel, or similar
3. Configure environment variables
4. Set up custom domain

### Database Setup
1. Create MongoDB database
2. Set up indexes for performance
3. Configure backup strategy
4. Monitor database performance

## 📊 API Endpoints

### Contact Management
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `PATCH /api/contact/:id` - Update contact status
- `GET /api/contact/stats` - Get contact statistics

### Appointment Management
- `POST /api/appointments` - Create appointment
- `GET /api/appointments` - Get all appointments
- `PATCH /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Reminder System
- `GET /api/reminders` - Get all reminders
- `POST /api/reminders/process` - Process pending reminders
- `POST /api/reminders/:id/retry` - Retry failed reminder

## 🧪 Testing

### Frontend Testing
```bash
cd Frontend
npm test
npm test -- --coverage
```

### Backend Testing
```bash
cd Backend
npm test
```

## 📈 Performance

### Frontend Optimizations
- Code splitting and lazy loading
- Image optimization
- Bundle size optimization
- Preconnect to external domains

### Backend Optimizations
- Database indexing
- Query optimization
- Caching strategies
- Rate limiting

## 🔒 Security

### Frontend Security
- Input sanitization
- XSS protection
- HTTPS enforcement
- Content Security Policy

### Backend Security
- Helmet security headers
- CORS configuration
- Input validation
- Rate limiting
- JWT authentication

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in Frontend/README.md and Backend/README.md
- Contact: your-email@domain.com

## 🔄 Changelog

### Version 1.0.0
- Initial release
- Complete frontend and backend implementation
- Responsive design
- SEO optimization
- Security features
- Performance optimizations

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database
- Tailwind CSS for the utility-first styling
- Framer Motion for the smooth animations
- All contributors and supporters

---

**Built with ❤️ for modern digital agencies** 