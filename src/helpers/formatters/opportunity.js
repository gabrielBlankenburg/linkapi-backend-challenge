const moment = require('moment-timezone');

// Formats the data from the mongodb to a json response
const aggregationToResponse = body => {
	return body.map(item => {
		return {
			date: moment(item._id).tz('GMT').format('YYYY-MM-DD'),
			total_earning: parseFloat(item.total).toFixed(2),
			total_sales_number: item.count
		}
	});
};

module.exports = { aggregationToResponse }
