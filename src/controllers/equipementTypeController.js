// equipementTypeController.js

const EquipementType = require('../models/equipementType');

exports.getEquipementTypes = async (req, res) => {
	try {
		const equipementTypes = await EquipementType.find();
		res.status(200).json(equipementTypes);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getEquipementTypeById = async (req, res) => {
	try {
		const equipementType = await EquipementType.findById(req.params.id);
		if (!equipementType) {
			return res.status(404).json({ message: "Type d'équipement non trouvé" });
		}
		res.status(200).json(equipementType);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.createEquipementType = async (req, res) => {
	const { nom } = req.body;

	try {
		const equipementType = new EquipementType({ nom });
		const newEquipementType = await equipementType.save();
		res.status(201).json(newEquipementType);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.updateEquipementType = async (req, res) => {
	const { nom } = req.body;

	try {
		const updatedEquipementType = await EquipementType.findByIdAndUpdate(
			req.params.id,
			{ nom },
			{ new: true },
		);
		if (!updatedEquipementType) {
			return res.status(404).json({ message: "Type d'équipement non trouvé" });
		}
		res.status(200).json(updatedEquipementType);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.deleteEquipementType = async (req, res) => {
	try {
		const equipementType = await EquipementType.findById(req.params.id);
		if (!equipementType) {
			return res.status(404).json({ message: "Type d'équipement non trouvé" });
		}
		await equipementType.deleteOne();
		res.status(204).json();
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
