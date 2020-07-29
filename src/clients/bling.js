const axios = require('axios');
const config = require('../config');

const bling = axios.create(
	{
		baseURL: config.bling.baseUrl,
		timeout: config.bling.timeout
	}
);

module.exports = bling;
