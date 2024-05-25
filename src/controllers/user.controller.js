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

exports.getProfile = async (req, res) => {
	res.status(200).json(req.user);
};

exports.getUsers = async (req, res) => {
	userService
		.getUsers()
		.then(r => res.status(200).json(r))
		.catch(err => res.status(500).json(err));
};

exports.getUserById = async (req, res) => {
	const user = await userService.getUserById(req.params.id);
	if (!user) {
		return res.status(404).json({ message: 'Utilisateur non trouvé' });
	}
	res.status(200).json(user);
};

exports.updateUser = async (req, res) => {
	userService
		.updateUser(req.params.id, req.body)
		.then(r => res.status(200).json(r))
		.catch(err => res.status(500).json(err));
};

exports.deleteUser = async (req, res) => {
	userService
		.deleteUser(req.params.id)
		.then(r => res.status(200).json(r))
		.catch(err => res.status(500).json(err));
};
