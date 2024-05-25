const userService = require('../services/user.service');

exports.signup = async (req, res) => {
	userService
		.createUser(req.body)
		.then(newUser => res.status(201).json(newUser))
		.catch(err => res.status(500).json(err));
};

exports.login = async (req, res) => {
	userService
		.loginUser(req.body)
		.then(r => res.status(200).json(r))
		.catch(err => res.status(500).json(err));
};

exports.getUsers = async (req, res) => {
	try {
		const users = await userService.getUsers();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getUserById = async (req, res) => {
	try {
		const user = await userService.getUserById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: 'Utilisateur non trouvé' });
		}
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.updateUser = async (req, res) => {
	const { nom, prenom, grade, unite } = req.body;

	try {
		const updatedUser = await userService.updateUser(
			req.params.id,
			nom,
			prenom,
			grade,
			unite,
		);
		res.status(200).json(updatedUser);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		await userService.deleteUser(req.params.id);
		res.status(204).json();
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getUsersByGrade = async (req, res) => {
	const { grade } = req.params;

	try {
		const users = await userService.getUserByGrade(grade);
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
