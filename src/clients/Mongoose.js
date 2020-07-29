const mongoose = require('mongoose');
const config = require('../config');

class Mongoose {
	init() {
		mongoose.connect(
			config.mongoose.address,
			{ useNewUrlParser: true }
		)
		.then(() => console.log('Mongoose is runnning'));
	}
}

module.exports = new Mongoose();
