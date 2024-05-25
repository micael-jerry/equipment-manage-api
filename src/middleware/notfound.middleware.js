const notFound = (req, res) => {
	res.json({ message: 'Route non trouvée' });
};

module.exports.notFound = notFound;
