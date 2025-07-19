const express = require('express');
const cors = require('cors');
const meetRoutes = require('./routes/meetRoutes');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', meetRoutes);

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../Frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Frontend/build', 'index.html'));
  });
}

module.exports = app; 