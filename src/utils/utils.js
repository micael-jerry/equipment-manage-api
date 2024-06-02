const mongoose = require('mongoose');

const isValidObjId = idString => {
	return mongoose.Types.ObjectId.isValid(idString);
};

module.exports.isValidObjId = isValidObjId;
