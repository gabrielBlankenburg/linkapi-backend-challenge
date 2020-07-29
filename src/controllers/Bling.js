const blingService = require('../services/Bling');
const formatter = require('../helpers/formatters/bling');

class Bling {
	// Get the Orders from Bling API
	getOrders(req, res, next) {
		blingService.getOrders()
		.then(response => {
			res.send(formatter.orderToResponse(response.data));
		})
		.catch(error => next(error));
	}
}

module.exports = new Bling();
