const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { UserGradeEnum, UserRoleEnum } = require('./user.type');

const userSchema = new mongoose.Schema({
	nom: String,
	prenom: String,
	grade: {
		type: String,
		enum: Object.values(UserGradeEnum),
		required: true,
	},
	unite: {
		type: Number,
		required: true,
	},
	pseudo: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: Object.values(UserRoleEnum),
		required: true,
	}
});

userSchema.pre('save', async function () {
	const salt = bcrypt.genSaltSync();
	this.password = bcrypt.hashSync(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);
