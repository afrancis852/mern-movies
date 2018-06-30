'use strict';

const User = require('./models/user');

var user = {
    email: 'admin@gmail.com',
    displayName: 'Admin User',
    password: 'Admin0*',
    role: 'admin'
};

User.create(user, function(err) {
    if(err && !err.errors.hasOwnProperty('email')) {
        throw err;
    }
});