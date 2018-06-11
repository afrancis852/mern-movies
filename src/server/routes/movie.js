'use strict';

const express = require('express');

const movieCtrl = require('../controllers/movie');

const api = express.Router();

api.get('/searchMovie', movieCtrl.searchMovie);

module.exports = api;