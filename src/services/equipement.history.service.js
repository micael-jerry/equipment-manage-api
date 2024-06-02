const EquipementHistory = require('../models/equipement.history');
const { isValidObjId } = require('../utils/utils');

exports.createEquipementHistory = async (
	equipement_id,
	user_id,
	type,
	before,
	after = null,
) => {
	const equipementHistory = new EquipementHistory({
		equipement: equipement_id,
		user: user_id,
		type,
		before,
		after,
	});
	return await equipementHistory.save();
};

exports.getEquipementHistory = async criteria => {
	const { equipement_id } = criteria;
	let query = {};
	if (isValidObjId(equipement_id)) query.equipement = equipement_id;
	return await EquipementHistory.find(query);
};

exports.getEquipementHistoryById = async id => {
	return await EquipementHistory.findById(id);
};
