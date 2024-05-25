const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {UserGradeEnum, UserRoleEnum} = require('../models/user.type');

exports.createUser = async objUser => {
	const { nom, prenom, grade, unite, pseudo, password } = objUser;
	if (!Object.values(UserGradeEnum).includes(grade))
		return Promise.reject({ message: 'Grade Invalide' });
	const user = new User({ nom, prenom, grade, unite, pseudo, password, role: UserRoleEnum.USER });
	return await user.save();
};

exports.loginUser = async objLog => {
	const { pseudo, password } = objLog;
	const user = await User.findOne({ pseudo });
	if (!user) {
		return Promise.reject({ message: 'Utilisateur non trouve' });
	}
	if (!bcrypt.compareSync(password, user.password)) {
		return Promise.reject({ message: 'Mot de passe invalide' });
	}
	return {
		token: jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY_JWT),
	};
};

exports.getUsers = async () => {
	return await User.find();
};

exports.getUserById = async id => {
	return await User.findById(id);
};

exports.getUserByName = async nom => {
	return await User.findOne({ nom });
};

exports.getUserByIdAndRole = async (id, role) => {
	return await User.findOne({ _id: id, role });
}

exports.updateUser = async (id, newUserInfo) => {
	const { nom, prenom, grade, unite, role } = newUserInfo;
	const user = await User.findById(id);
	if (!user) {
		return Promise.reject({ message: 'utilisateur non trouvee' });
	}
	user.nom = nom || user.nom;
	user.prenom = prenom || user.prenom;
	user.grade = grade || user.grade;
	user.unite = unite || user.unite;
	user.role = role || user.role;
	return await user.save();
};

exports.deleteUser = async id => {
	const user = await User.findById(id);
	if (!user) {
		return Promise.reject({ message: 'utilisateur non trouvee' });
	}

	await user.deleteOne({ _id: id });
};
