const notFound = (req, res) => {
	res.status(404).json({ message: 'Route non trouvée' });
};

module.exports.notFound = notFound;
