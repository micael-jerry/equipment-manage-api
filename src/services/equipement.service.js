const Equipement = require('../models/equipement');
const { EquipementTypeEnum, EquipementStatusEnum } = require('../models/equipement.type');

exports.getEquipements = async () => {
	return await Equipement.find();
};

exports.getEquipementById = async id => {
	return await Equipement.findById(id);
};

exports.createEquipement = async (equipementObj) => {
	const {
		nom,
		numero_de_serie,
		description,
		pays_d_origine,
		annee_de_fabrication,
		type,
	} = equipementObj;
	if (!Object.values(EquipementTypeEnum).includes(type)) {
		return Promise.reject({
			message: "Type d'équipement invalide"
		})
	}
	const equipement = new Equipement({
		nom,
		numero_de_serie,
		description,
		pays_d_origine,
		annee_de_fabrication,
		type,
		status: EquipementStatusEnum.INACTIF
	});
	return await equipement.save();
};

exports.updateEquipement = async (id, equipementUpdateObj) => {
	const {
		nom,
		numero_de_serie,
		description,
		pays_d_origine,
		annee_de_fabrication,
		type,
		status,
	} = equipementUpdateObj;
	const equipement = await Equipement.findById(id);
	if (!equipement) {
		return Promise.reject({
			message: 'Équipement non trouvé'
		})
	}
	equipement.nom = nom || equipement.nom;
	equipement.numero_de_serie = numero_de_serie || equipement.numero_de_serie;
	equipement.description = description || equipement.description;
	equipement.pays_d_origine = pays_d_origine || equipement.pays_d_origine;
	equipement.annee_de_fabrication = annee_de_fabrication || equipement.annee_de_fabrication;
	equipement.type = type || equipement.type;
	equipement.status = status || equipement.status;
	return await equipement.save();
};

exports.deleteEquipement = async id => {
	const equipement = await Equipement.findById(id);
	if (!equipement) {
		return Promise.reject({
			message: 'Équipement non trouvé'
		})
	}
	await equipement.deleteOne({ _id: id });
};
