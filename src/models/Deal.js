const mongoose = require('mongoose');

const schema = new mongoose.Schema(
	{
		pipedriveId: {
			type: Number,
			required: true
		},
		blingId: {
			type: Number,
			required: true
		},
		value: {
			type: Number,
			required: true
		},
		date: {
			type: Date,
			required: true
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Deal', schema);
