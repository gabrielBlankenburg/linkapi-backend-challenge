const express = require('express');
const controller = require('../controllers/Bling');
const router = express.Router();

router.get('/orders', controller.getOrders);

module.exports = router;
