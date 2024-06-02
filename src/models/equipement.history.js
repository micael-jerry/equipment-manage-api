const mongoose = require('mongoose');
const { EquipementHistoryTypeEnum } = require('./equipement.history.type');

const equipementHistorySchema = mongoose.Schema(
	{
		equipement: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Equipement',
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		type: {
			type: String,
			enum: Object.values(EquipementHistoryTypeEnum),
			required: true,
		},
		before: {
			type: Map,
		},
		after: {
			type: Map,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('EquipementHistory', equipementHistorySchema);
