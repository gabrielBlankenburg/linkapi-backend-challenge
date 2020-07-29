const pipedriveService = require('../services/Pipedrive');
const formatter = require('../helpers/formatters/pipedrive');

class Pipedrive {
	// Get all deals from Pipedrive API
	getDeals(req, res, next) {
		pipedriveService.getDeals()
		.then(response => {
			res.send(formatter.dealToResponse(response.data));
		})
		.catch(error => next(error));
	}

	// Get all won deals and inserts on the mongodb and on the bling
	syncDeals(req, res, next) {
		pipedriveService.syncDeals()
		.then(response => res.send(response))
		.catch(error => next(error));
	}
}

module.exports = new Pipedrive();
