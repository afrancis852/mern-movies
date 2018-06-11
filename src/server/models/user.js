'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const List = mongoose.model('List');

const UserSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	displayName: String,
	avatar: String,
    password: { type: String, select: false },
    list: { type: Schema.ObjectId, ref: "List" }
});

// Antes que se almacene el usuario se ejecuta la siguiente funcion para encriptar el password
UserSchema.pre('save', (next) => {
	let user = this;

	bcrypt.genSalt(10, (err, salt) => {
		if(err)	return next(err);

		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if(err)	return next(err);

			user.password = hash;
			next();
		});
	});
});

module.exports = mongoose.model('User', UserSchema)