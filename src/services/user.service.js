const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UserTypeEnum = require('../models/userType');

const createUser = async objUser => {
	const { nom, prenom, grade, unite, pseudo, password } = objUser;
	if (!Object.values(UserTypeEnum).includes(grade))
		return Promise.reject({ message: 'Grade Invalide' });
	const user = new User({ nom, prenom, grade, unite, pseudo, password });
	return await user.save();
};

const loginUser = async objLog => {
	const { pseudo, password } = objLog;
	const user = await User.findOne({ pseudo });
	if (!user) {
		return Promise.reject({ message: 'Utilisateur non trouve' });
	}
	if (!bcrypt.compareSync(password, user.password)) {
		return Promise.reject({ message: 'Mot de passe invalide' });
	}
	return {
		user: user,
		token: jwt.sign({ userId: user._id }, process.env.SECRET_KEY_JWT),
	};
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

module.exports = {
	createUser,
	loginUser,
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
	getUserByName,
};
