const User = require('../models/user');
const UserTypeEnum = require('../models/userType');

const createUser = async objUser => {
	const { nom, prenom, grade, unite, pseudo, password } = objUser;
	if (!Object.values(UserTypeEnum).includes(grade))
		return Promise.reject({ message: 'Grade Invalide' });
	const user = new User({ nom, prenom, grade, unite, pseudo, password });
	return await user.save();
};

const getUsers = async () => {
	return await User.find();
};

const getUserById = async id => {
	return await User.findById(id);
};

const getUserByName = async nom => {
	return await User.findOne({ nom });
};

const updateUser = async (id, nom, prenom, grade, unite) => {
	const user = await User.findById(id);
	if (!user) {
		throw new Error('Utilisateur non trouvé');
	}

	user.nom = nom || user.nom;
	user.prenom = prenom || user.prenom;
	user.grade = grade || user.grade;
	user.unite = unite || user.unite;

	return await user.save();
};

const deleteUser = async id => {
	const user = await User.findById(id);
	if (!user) {
		throw new Error('Utilisateur non trouvé');
	}

	await user.deleteOne({ _id: id });
};

async function compare(a, b) {
	if (a === b) return true;
	else return false;
}
module.exports = {
	createUser,
	getUsers,
	compare,
	getUserById,
	updateUser,
	deleteUser,
	getUserByName,
};
