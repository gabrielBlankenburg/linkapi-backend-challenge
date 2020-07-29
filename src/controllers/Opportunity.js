const opportunityService = require('../services/Opportunity');
const { aggregationToResponse } = require('../helpers/formatters/opportunity');

class Opportunity {
	// Get the daily earnings from the database
	getDailyData(req, res, next) {
		opportunityService.getDailyData()
		.then(response => {
			res.send(aggregationToResponse(response));
		})
		.catch(error => next(error));
	}
}

module.exports = new Opportunity();
