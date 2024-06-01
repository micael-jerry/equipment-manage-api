const Equipement = require('../models/equipement');
const {
	EquipementTypeEnum,
	EquipementStatusEnum,
} = require('../models/equipement.type');

exports.getEquipements = async criteria => {
	let { nom, type, status } = criteria;
	let query = {};
	if (nom) query.nom = { $regex: new RegExp(nom, 'i') };
	if (Object.values(EquipementTypeEnum).includes(type)) query.type = type;
	if (Object.values(EquipementStatusEnum).includes(status))
		query.status = status;
	return await Equipement.find(query);
};

exports.getEquipementById = async id => {
	return await Equipement.findById(id);
};

exports.createEquipement = async equipementObj => {
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
			message: "Type d'équipement invalide",
		});
	}
	const equipement = new Equipement({
		nom,
		numero_de_serie,
		description,
		pays_d_origine,
		annee_de_fabrication,
		type,
		status: EquipementStatusEnum.INACTIF,
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
			message: 'Équipement non trouvé',
		});
	}
	if (type && !Object.values(EquipementTypeEnum).includes(type)) {
		return Promise.reject({
			message: "Type d'équipement invalide",
		});
	}
	if (status && !Object.values(EquipementStatusEnum).includes(status)) {
		return Promise.reject({
			message: "Status d'équipement invalide",
		});
	}
	return await Equipement.findOneAndUpdate(
		{ _id: id },
		{
			nom,
			numero_de_serie,
			description,
			pays_d_origine,
			annee_de_fabrication,
			type,
			status,
		},
		{ new: true }
	);
};

exports.deleteEquipement = async id => {
	const equipement = await Equipement.findById(id);
	if (!equipement) {
		return Promise.reject({
			message: 'Équipement non trouvé',
		});
	}
	await equipement.deleteOne({ _id: id });
};
