const mongoose = require('mongoose');

const equipementSchema = new mongoose.Schema({
	nom: { type: String, required: true },
	description: { type: String, required: true },
	pays_d_origine: { type: String, required: true },
	annee_de_fabrication: { type: Number, required: true },
	type: {
		type: String,
		enum: [
			'Véhicules terrestres',
			'Armement',
			'Matériel de communication',
			'Équipement médical',
			'Équipement de protection',
			'Équipement logistique',
			'Matériel de génie',
			'Équipement de surveillance et de reconnaissance',
			'Équipement de soutien',
			'Équipement informatique et électronique',
		],
		required: true,
	},
	status_equipement: {
		type: String,
		enum: ['en cours de maintenance', 'actif', 'inactif'],
		required: true,
	},
});

module.exports = mongoose.model('Equipement', equipementSchema);
