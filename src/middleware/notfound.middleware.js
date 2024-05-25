const notFound = (req, res, next) => {
	res.json({ message: 'Route non trouvée' });
};

module.exports.notFound = notFound;
