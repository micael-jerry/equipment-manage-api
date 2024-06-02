const Equipement = require('../models/equipement');
const {
	EquipementHistoryTypeEnum,
} = require('../models/equipement.history.type');
const {
	EquipementTypeEnum,
	EquipementStatusEnum,
} = require('../models/equipement.type');
const { createEquipementHistory } = require('./equipement.history.service');
const { getSiteById } = require('./site.service');

exports.getEquipements = async criteria => {
	let { nom, type, status, site } = criteria;
	let query = {};
	if (nom) query.nom = { $regex: new RegExp(nom, 'i') };
	if (Object.values(EquipementTypeEnum).includes(type)) query.type = type;
	if (Object.values(EquipementStatusEnum).includes(status))
		query.status = status;
	if (site) {
		await getSiteById(site).then(siteObj => {
			query.site = siteObj._id;
		});
	}
	return await Equipement.find(query).populate('site');
};

exports.getEquipementById = async id => {
	return await Equipement.findById(id);
};

exports.createEquipement = async (userId, equipementObj) => {
	const {
		nom,
		numero_de_serie,
		description,
		pays_d_origine,
		annee_de_fabrication,
		type,
		site,
	} = equipementObj;
	if (!Object.values(EquipementTypeEnum).includes(type)) {
		return Promise.reject({
			message: "Type d'équipement invalide",
		});
	}
	const siteObj = await getSiteById(site);
	if (!siteObj) {
		return Promise.reject({
			message: 'Site non trouvé',
		});
	}
	const equipement = new Equipement({
		nom,
		numero_de_serie,
		description,
		pays_d_origine,
		annee_de_fabrication,
		type,
		site: siteObj._id,
		status: EquipementStatusEnum.INACTIF,
	});
	return await equipement.save().then(async created => {
		await createEquipementHistory(
			created._id,
			userId,
			EquipementHistoryTypeEnum.CREATION,
			created.toObject(),
		);
		return created;
	});
};

exports.updateEquipement = async (userId, id, equipementUpdateObj) => {
	const {
		nom,
		numero_de_serie,
		description,
		pays_d_origine,
		annee_de_fabrication,
		type,
		site,
		status,
	} = equipementUpdateObj;
	const equipement = await Equipement.findById(id);
	if (!equipement) {
		return Promise.reject({
			message: 'Équipement non trouvé',
		});
	}
	const siteObj = await getSiteById(site);
	if (!siteObj) {
		return Promise.reject({
			message: 'Site non trouvé',
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
			site: siteObj._id,
			status,
		},
		{ new: true },
	).then(async updated => {
		await createEquipementHistory(
			updated._id,
			userId,
			EquipementHistoryTypeEnum.MODIFICATION,
			equipement.toObject(),
			updated.toObject(),
		);
		return updated;
	});
};

exports.deleteEquipement = async (userId, id) => {
	const equipement = await Equipement.findById(id);
	if (!equipement) {
		return Promise.reject({
			message: 'Équipement non trouvé',
		});
	}
	await equipement.deleteOne({ _id: id }).then(async res => {
		await createEquipementHistory(
			equipement._id,
			userId,
			EquipementHistoryTypeEnum.SUPPRESSION,
			equipement.toObject(),
		);
		return res;
	});
};
