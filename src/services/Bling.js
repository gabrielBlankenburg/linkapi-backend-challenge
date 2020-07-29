const bling = require('../clients/bling');
const config = require('../config');
const moment = require('moment-timezone');
const qs = require('query-string');

class Bling {
	// Return all orders from the Bling API
	async getOrders() {
		return bling.get(`/pedidos/json?apikey=${config.bling.apiToken}`);
	}

	// Posts a new order to the Bling API
	async postOrder(xml) {
		const params = {
			apikey: config.bling.apiToken,
			xml
		}

		const requestConfig = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}

		return bling.post(
			'/pedido/json/', 
			qs.stringify(params), 
			requestConfig
		);
	}
}

module.exports = new Bling();
