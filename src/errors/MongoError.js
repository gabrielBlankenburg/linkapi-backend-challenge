class MongoError extends Error {
	constructor(message) {
		super(message);
		this.name = 'MongoError';
	}
}

module.exports = MongoError;
