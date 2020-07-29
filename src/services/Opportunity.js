const dealModel = require('../models/Deal');

class Opportunity {
	// Aggregates the deal model grouping by date with the sum of the values
	async getDailyData(xml) {
		return await dealModel.aggregate([
			{
				$group: {
					_id: "$date",
					total: {
						$sum: "$value"
					},
					count: {
						$sum: 1
					}
				}
			}
		]).sort({_id: 'desc'});
	}
}

module.exports = new Opportunity();
