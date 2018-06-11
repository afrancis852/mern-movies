'use strict';

const express = require('express');

const movieCtrl = require('../controllers/movie');

const api = express.Router();

api.post('/searchMovie', movieCtrl.searchMovie);

module.exports = api;