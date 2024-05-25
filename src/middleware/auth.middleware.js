const jwt = require('jsonwebtoken');
const user = require('../models/user');

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
				await user.findById(decodedToken.userId)
					.then((r) => {
						req.user = r;
						next();
					})
					.catch(() => {
            res.status(401).json({
              message: 'Unauthorized',
            });
          });
			}
		});
	} catch (error) {
		res.status(401).json({
			message: 'Unauthorized',
		});
	}
};
