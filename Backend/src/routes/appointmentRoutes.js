const express = require('express');
const router = express.Router();
const { calendlyWebhook } = require('../controllers/appointmentController');

router.post('/webhook', express.json({ type: '*/*' }), calendlyWebhook);
 
module.exports = router; 