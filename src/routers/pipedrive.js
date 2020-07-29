const express = require('express');
const controller = require('../controllers/Pipedrive');
const router = express.Router();

router.post('/deals/sync', controller.syncDeals);
router.get('/deals', controller.getDeals);

module.exports = router;
