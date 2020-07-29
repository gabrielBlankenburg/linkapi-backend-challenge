const express = require('express');
const controller = require('../controllers/Opportunity');
const router = express.Router();

router.get('/daily-report', controller.getDailyData);

module.exports = router;
