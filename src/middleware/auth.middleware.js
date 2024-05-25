const jwt = require('jsonwebtoken');
exports.verifyAuth = (req, res, next) => {
	const bearerToken = req.headers.authorization;
	try {
		const token = bearerToken.split(' ')[1];
		jwt.verify(token, process.env.SECRET_KEY_JWT, async (err, decodedToken) => {
			if (err) {
				res.status(401).json({
					message: 'Unauthorized',
				});
			} else {
				req.user = {
					_id: decodedToken._id,
					role: decodedToken.role,
				};
				next();
			}
		});
	} catch (error) {
		res.status(401).json({
			message: 'Unauthorized',
		});
	}
};
