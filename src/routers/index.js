const express = require('express');
const router = express.Router();
const pipedrive = require('./pipedrive');
const opportunity = require('./opportunity');
const bling = require('./bling');

router.use('/v1/opportunities', opportunity);
router.use('/v1/pipedrive', pipedrive);
router.use('/v1/bling', bling);

module.exports = router;
