const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

exports.signup = async (req, res) => {
	userService
		.createUser(req.body)
		.then(newUser => res.status(201).json(newUser))
		.catch(err => res.status(500).json(err));
};

exports.login = async (req, res) => {
	const { nom, password } = req.body;
	try {
		const user = await userService.getUserByName(nom);
		if (!user) {
			return res
				.status(404)
				.json({ message: "Nom d'utilisateur ou mot de passe incorrect." });
		}
		const isPasswordValid = await userService.compare(password, user.password);
		if (!isPasswordValid) {
			return res
				.status(401)
				.json({ message: "Nom d'utilisateur ou mot de passe incorrect." });
		}
		const token = jwt.sign({ userId: user._id }, 'your_secret_key', {
			expiresIn: '1h',
		});
		res.cookie('session', token, { httpOnly: true, maxAge: 3600000 });
		res
			.status(200)
			.json({ message: `Authentification réussie`, token: `${token}`, user });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.logout = async (req, res) => {
	res.cookie('session', '', { expires: new Date(0) });
	res.status(200).json({ message: 'Déconnexion réussie.' });
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

exports.resetPassword = async (req, res) => {
	const { unite } = req.body;

	try {
		const user = await userService.getUserByUnite(unite);
		if (!user) {
			return res
				.status(404)
				.json({ message: 'Aucun utilisateur trouvé avec cette unité.' });
		}

		res.status(200).json({
			message:
				'Un nouveau mot de passe temporaire a été envoyé à votre adresse e-mail.',
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
