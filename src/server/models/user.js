'use strict';

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const saltRounds = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: { 
				type: String,
				required: 'El email es obligatorio',
				unique: 'El email ({VALUE}) ya está en uso',
				match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'El email es inválido'],
				lowercase: true
	},
	displayName: {
					type: String,
					required: 'El nombre de usuario es obligatorio',
					unique: 'El nombre de usuario ({VALUE}) ya está en uso',
					minlength: [5, 'El nombre de usuario debe tener una longitud mínima de 5 caracteres'],
					maxlength: [20, 'El nombre de usuario debe tener una longitud máxima de 20 caracteres']
	},	
    password: {
				type: String,
				required: 'El password es obligatorio',
				minlength: [7, 'El password debe tener una longitud mínima de 7 caracteres'],
				match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]+$/, 'El password debe contener por lo menos una mayúscula, una minúscula, un número y un caracter especial'],
				select: false
	},
	avatar: { type: String, default: 'avatar' },
	role: { type: String, enum: ['admin', 'user'] },
	signupDate: { type: Date, default: Date.now() },
    list: [{ type: Schema.ObjectId, ref: 'List' }]
});

UserSchema.plugin(beautifyUnique);

UserSchema.pre('save', function(next) {
	let user = this;
	if(!user.isModified('password')) return next();

	bcrypt.genSalt(saltRounds, function(err, salt) {
		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err)	return next(err);

			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function(pass, cb) {
    bcrypt.compare(pass, this.password, function(err, isMatch) {
		if(err)	return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);