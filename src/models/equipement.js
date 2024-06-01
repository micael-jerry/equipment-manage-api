const mongoose = require('mongoose');
const {
	EquipementTypeEnum,
	EquipementStatusEnum,
} = require('./equipement.type');

const equipementSchema = new mongoose.Schema(
	{
		nom: { type: String, required: true },
		numero_de_serie: { type: String, required: true, unique: true, trim: true },
		description: { type: String, required: true },
		pays_d_origine: { type: String, required: true },
		annee_de_fabrication: { type: Number, required: true },
		type: {
			type: String,
			enum: Object.values(EquipementTypeEnum),
			required: true,
		},
		status: {
			type: String,
			enum: Object.values(EquipementStatusEnum),
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('Equipement', equipementSchema);
