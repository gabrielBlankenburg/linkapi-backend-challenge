const axios = require('axios');
const config = require('../config');

const pipedrive = axios.create(
	{
		baseURL: config.pipedrive.baseUrl,
		timeout: config.pipedrive.timeout,
		headers: {
			'Accept': 'application/json'
		}
	}
);

module.exports = pipedrive;
