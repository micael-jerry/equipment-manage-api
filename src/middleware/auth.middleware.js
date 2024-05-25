const jwt = require('jsonwebtoken');
const { getUserByIdAndRole } = require('../services/user.service');
const { UserRoleEnum } = require('../models/user.type');
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
				await getUserByIdAndRole(decodedToken._id, decodedToken.role)
					.then((u) => {
						req.user = u
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

exports.verifyAdminAccess = (req, res, next) => {
	if (req.user.role === UserRoleEnum.ADMIN) {
    next();
  } else {
    res.status(401).json({
      message: 'Unauthorized',
    });
  }
}
