'use strict';

const express = require('express');

const userCtrl = require('../controllers/user');

const api = express.Router();

api.post('/signUp', userCtrl.signUp);
api.post('/signIn', userCtrl.signIn);
api.delete('/user/:userID', userCtrl.removeUser);
api.put('/user/:userID', userCtrl.updateUser);

module.exports = api;