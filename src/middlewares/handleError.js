const IntegrationError = require('../errors/IntegrationError');
const MongoError = require('../errors/MongoError');

// It handles all possible errors, so the end user will not see any unwanted data
const handleError = (error, req, res, next) => {
	if (!error) {
		return next();
	}

	if (error instanceof IntegrationError || 
		error instanceof MongoError
	) {
		res.status(500)
		res.send(formatResponse(error));
		return;
	}

	console.log(error);
	res.status(500)
	res.send({
		error: "UnknownError",
		message: "An unexpected error hapned, please try again later"
	});
}

const formatResponse = error => ({
	error: error.name,
	message: error.message
});

module.exports = handleError;
