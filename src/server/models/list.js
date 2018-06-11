'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Movie = mongoose.model('Movie');

const ListSchema = Schema({
	name: String,
    movies: [MovieSchema]
});

module.exports = mongoose.model('List', ListSchema);