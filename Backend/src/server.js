// Load environment variables from .env file
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');

const app = express();

// Use CORS settings from .env if available, otherwise fallback
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
app.use(cors({
  origin: corsOrigin,
  credentials: true,
}));
app.use(express.json());

// Appointment webhook route
const appointmentRoutes = require('./routes/appointmentRoutes');
app.use('/api/appointments', appointmentRoutes);

// Lead magnet route
const leadRoutes = require('./routes/leadRoutes');
app.use('/api', leadRoutes);

// ...other routes (if any)

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
