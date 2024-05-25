const mongoose = require('mongoose');

const connectAppToDatabase = async () => {
	await mongoose
		.connect(process.env.MONGODB_URI, {
			bufferCommands: true,
			autoIndex: true,
		})
		.then(() => console.log('Base de donnee connecter'))
		.catch(err => {
			throw err;
		});
};

module.exports.connectAppToDatabase = connectAppToDatabase;
