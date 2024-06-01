const mongoose = require('mongoose');

const siteSchema = mongoose.Schema({
	adresse: {
		type: String,
		required: true,
	},
	ville: {
		type: String,
		required: true,
	},
	region: {
		type: String,
		required: true,
	},
	code_postal: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model('Site', siteSchema);
