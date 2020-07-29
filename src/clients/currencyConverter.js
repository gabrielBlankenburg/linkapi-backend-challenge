const axios = require('axios');
const config = require('../config');

const currencyConverter = axios.create(
	{
		baseURL: config.currencyConverter.baseUrl,
		timeout: config.currencyConverter.timeout
	}
);

module.exports = currencyConverter;
