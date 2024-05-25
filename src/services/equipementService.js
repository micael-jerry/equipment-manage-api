const Equipement = require('../models/equipement');
const HistoriqueService = require('./historiqueService');

const getEquipements = async () => {
	return await Equipement.find();
};

const getEquipementById = async id => {
	return await Equipement.findById(id);
};

const createEquipement = async (
	nom,
	description,
	pays_d_origine,
	annee_de_fabrication,
	type,
	status_equipement,
) => {
	const equipement = new Equipement({
		nom,
		description,
		pays_d_origine,
		annee_de_fabrication,
		type,
		status_equipement,
	});
	const savedEquipement = await equipement.save();

	// Create history for the created equipement
	await HistoriqueService.createAddEqHistory(savedEquipement._id, null, null);
	return savedEquipement;
};

const updateEquipement = async (
	id,
	nom,
	description,
	pays_d_origine,
	annee_de_fabrication,
	type,
	status_equipement,
) => {
	const equipement = await Equipement.findById(id);
	if (!equipement) {
		throw new Error('Équipement non trouvé');
	}

	equipement.nom = nom || equipement.nom;
	equipement.description = description || equipement.description;
	equipement.pays_d_origine = pays_d_origine || equipement.pays_d_origine;
	equipement.annee_de_fabrication =
		annee_de_fabrication || equipement.annee_de_fabrication;
	equipement.type = type || equipement.type;
	equipement.status_equipement =
		status_equipement || equipement.status_equipement;

	const updatedEquipement = await equipement.save();

	// Create history for the updated equipement
	await HistoriqueService.createAddEqHistory(updatedEquipement._id, null, null);

	return updatedEquipement;
};

const deleteEquipement = async id => {
	const equipement = await Equipement.findById(id);
	if (!equipement) {
		throw new Error('Équipement non trouvé');
	}

	await equipement.deleteOne({ _id: id });

	// Create history for the deleted equipement
	await HistoriqueService.createDeleteHistory(
		equipement._id,
		null,
		new Date(),
		'Équipement supprimé',
		null,
	);
};

module.exports = {
	getEquipements,
	getEquipementById,
	createEquipement,
	updateEquipement,
	deleteEquipement,
};
